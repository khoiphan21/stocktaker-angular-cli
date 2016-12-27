import { Injectable } from '@angular/core';
var PouchDB = require('pouchdb');
// import * as _ from 'underscore';
import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';
import { ServiceResponse } from './shared/classes/service-response';
import { ServiceResponseStatus } from './shared/classes/service-response-status';

@Injectable()
export class StockService {
  /** 
   * The database of all warehouse items in the stock
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
    this.getAll().then(items => console.log(items));
  }

  /**
   * Start the database by retrieving it from the remote server
   * Optional 'testInitialDatabase' line for testInitialDatabaseing
   */
  initDB() {
    this._warehouseDatabase = new PouchDB(
      'http://admin:oh5nWhWX@104.155.219.39:5984/stocktaker-item');
    this._stockInfoDatabase = new PouchDB('http://104.155.219.39:5984/stocktaker-stock-info');
    // this.testInitialDatabase();
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
      return Promise.resolve(new ServiceResponse(
        ServiceResponseStatus.ERROR, 'This item already exists in the database'
      ));
    } else {
      this._warehouseDatabase.put(item).then(response => {
        // Now need to look what is in the response
        console.log(response);

        return Promise.resolve(new ServiceResponse(ServiceResponseStatus.OK, 
          'All is well. Item ' + item.name + ' has been added successfully'));
      }).catch(error => {
        console.log(error);
      })
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

  deleteWareHouseItem(item: WarehouseStockItem) {
    return this._warehouseDatabase.remove(item);
  }

  getItem(itemId: string): Promise<WarehouseStockItem> {
    return this._warehouseDatabase.get(itemId);
  }

  getAll(): Promise<WarehouseStockItem[]> {
    if (!this.warehouseItems) {
      return this._warehouseDatabase.allDocs({ include_docs: true })
          .then(docs => {
            this.warehouseItems = docs.rows.map(row => {
              row.doc.Date = new Date(row.doc.Date);
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


}
