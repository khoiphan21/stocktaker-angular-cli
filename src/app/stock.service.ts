import { Injectable } from '@angular/core';

import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';
import { ServiceResponse } from './shared/classes/service-response';
import { ServiceResponseStatus } from './shared/classes/service-response-status';
import { Section } from './shared/classes/section';

let PouchDB = require('pouchdb');
import * as _ from 'underscore';

@Injectable()
export class StockService {
  /** 
   * The database of all the metadata: categories and sections
   */
  private _warehouseDatabase;
  /**
   * The array containing all warehouse items
   */
  private warehouseItems: Array<WarehouseStockItem>;
  /**
   * The database containing all metadata of the items, including
   * all the categories and sections
   */
  private _stockInfoDatabase;

  constructor() {
  }

  testInitialDatabase() {
    // Print the whole database
    console.log(this._warehouseDatabase);
    // Print the items in the database
    this.getAllItems().then(items => console.log(items));
  }

  /**
   * Start the database by retrieving it from the remote server
   * Optional 'testInitialDatabase' line for testInitialDatabaseing
   */
  initDB() {
    this._warehouseDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/stocktaker-items');
    this._stockInfoDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/stocktaker-stock-info');
    // this.testInitialDatabase();
  }

  /**
   * Initialise the databases for testing
   */
  initTestDB() {
    this._warehouseDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/test-stocktaker-items');
    this._stockInfoDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/test-stocktaker-stock-info');
  }

  /**
   * Initialise Kerko's database
   */
  initKerkoDB() {
    this._warehouseDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/julia-warehouse-items');
    this._stockInfoDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/julia-warehouse-stock-info');
  }

  /**
   * Add a warehouse item to the database. 
   * 
   * @return true if the operation is successful
   *         false if another item with the same name already 
   *             exists in the database
   */
  addWarehouseItem(item: WarehouseStockItem): Promise<ServiceResponse> {
    // Check if the database already contains the item
    if (this.checkForDuplicateItem(item)) {
      return Promise.reject(new ServiceResponse(
        ServiceResponseStatus.ERROR, 'This item already exists in the database'
      ));
    } else {
      return this._warehouseDatabase.put(item).then(response => {
        // Now need to look what is in the response
        // console.log(response);

        return Promise.resolve(new ServiceResponse(ServiceResponseStatus.OK,
          'All is well. Item ' + item.name + ' has been added successfully'));
      }).catch(error => {
        console.log(error);
        return Promise.reject(new ServiceResponse(
          ServiceResponseStatus.ERROR, error
        ));
      });
    }
  }

  

  /**
   * Check the given item against the list of stored items to see if 
   * the item already exists in the database
   * 
   * @return true if there is duplication, false otherwise
   */
  private checkForDuplicateItem(item: WarehouseStockItem): boolean {
    return false;
  }

  updateWarehouseItem(item: WarehouseStockItem) {
    return this._warehouseDatabase.put(item);
  }

  deleteWareHouseItem(item: WarehouseStockItem): Promise<ServiceResponse> {
    return this._warehouseDatabase.get(item.name).then( doc =>{
      this._warehouseDatabase.remove(doc._id, doc._rev);
      return new ServiceResponse(ServiceResponseStatus.OK, 'item deleted successfully');
    }).catch( error => {
      return new ServiceResponse(ServiceResponseStatus.ERROR, error);
    });
  }

  getItem(itemId: string): Promise<WarehouseStockItem> {
    return this._warehouseDatabase.get(itemId);
  }

  /**
   * Return a promise of the array of sections, which are "Section-like"
   * objects (objects with only properties). These objects will need to be
   * cast to actual Section objects
   * 
   * @return  a promise of an array of the sections
   */
  getAllSections(): Promise<Section[]> {
    return this._stockInfoDatabase.get('sections').then(sections => {
      return sections.sectionList;
    });
  }

  /**
   * Sync the list of sections with the given array of sections
   */
  updateSections(newSectionList: Section[]): Promise<ServiceResponse> {
    // The current issue is with circular reference, so will construct  
    // a new section list to be updated
    let jsonSectionList = [];
    _.each(newSectionList, section => {
      jsonSectionList.push({
        name: section.name,
        categoryList: section.categoryList
      })
    })

    return this._stockInfoDatabase.get('sections').then(doc => {
      return this._stockInfoDatabase.put({
        _id: 'sections',
        _rev: doc._rev,
        sectionList: jsonSectionList
      })
    }).then( response => {
      return Promise.resolve(
        new ServiceResponse(ServiceResponseStatus.OK, 'All is well.')
      );
    }).catch( error => {
      return Promise.reject(
        new ServiceResponse(ServiceResponseStatus.ERROR, error)
      );
    });
  }

  /**
   * Attempt to add a section to the database. 
   * 
   * @return  a promise containing the response of the service
   */
  addSection(section: Section): Promise<ServiceResponse> {
    return this._stockInfoDatabase.get('sections').then(doc => {
      // First check if the section is already in the list of section
      // Checking mechanism: check by the name of the section
      let currentList = doc.sectionList;
      if (this.doesSectionExist(currentList, section)) {
        console.log('section is duplicated');
        return Promise.reject('The item already exists in the database');
      }

      // If control reaches here, the section should be safe to be added
      let newSectionList = doc.sectionList;
      newSectionList.push(section);
      return this._stockInfoDatabase.put({
        _id: 'sections',
        _rev: doc._rev,
        sectionList: newSectionList
      });
    }).then( response => {
      return Promise.resolve(
        new ServiceResponse(ServiceResponseStatus.OK, 'All is well.')
      );
    }).catch( error => {
      return Promise.resolve(
        new ServiceResponse(ServiceResponseStatus.ERROR, error)
      );
    });
  }

  /**
   * Attempt to delete a section from the list of sections in the database
   * 
   * @return  a promise containing the response of the service
   */
  deleteSection(section: Section): Promise<ServiceResponse> {
    return this._stockInfoDatabase.get('sections').then(doc => {
      // Retrieve the current list
      let currentList: Section[] = doc.sectionList;

      // Check if the given section is within this list
      if (!this.doesSectionExist(currentList, section)) {
        return Promise.reject('Section cannot be deleted: it does not exist.');
      }
      
      // Get the new list of sections
      let newList: Section[] = _.filter(currentList, (item: Section) => {
        return item.name != section.name;
      });

      return this._stockInfoDatabase.put({
        _id: 'sections',
        _rev: doc._rev,
        sectionList: newList
      }).catch (error => {
        console.log(error);
      });

    }).then( response => {
      return Promise.resolve(
        new ServiceResponse(ServiceResponseStatus.OK, 'Section is deleted successfully')
      );
    }).catch( error => {
      return Promise.reject(
        new ServiceResponse(ServiceResponseStatus.ERROR, error)
      );
    })
  }

  /**
   * Retrieve the array of all (currently) warehouse stock items. These 
   * are not actual items, but "database items" that will need to be cast
   * to real WarehouseStockItems
   */
  getAllItems(): Promise<WarehouseStockItem[]> {
    if (!this.warehouseItems) {
      return this._warehouseDatabase.allDocs({ include_docs: true })
          .then(docs => {
            this.warehouseItems = docs.rows.map(row => {
              return row.doc;
            });

            // Listen for changes on the database.
            this._warehouseDatabase.changes({
              live: true,
              since: 'now',
              include_docs: true
            }).on ('change', this.onDatabaseChange);

            return this.warehouseItems;
          });
    } else {
      return Promise.resolve(this.warehouseItems);
    }
  }
  private onDatabaseChange = (change) => {
    // let index: number = _.findIndex(this.warehouseItems, change.id);
    // let item = this.warehouseItems[index];

    // if (change.deleted) {
    //   if (item) {
    //     this.warehouseItems.splice(index, 1); // delete
    //   } else {
    //     if (item && item.name.toLowerCase() === change.name)
    //   }
  }
  
  /**
   * Check an array of sections to see if a given section already exists in it
   * 
   * Checking via Section.name
   * 
   * @return true if the section already exists, false otherwise
   */
  private doesSectionExist(list: Section[], section: Section): boolean {
    let duplicateSection: Section = _.find(list, (item: Section) => {
      return section.name == item.name;
    });
    if (duplicateSection) {
      return true;
    } else {
      return false;
    }
  }
}
