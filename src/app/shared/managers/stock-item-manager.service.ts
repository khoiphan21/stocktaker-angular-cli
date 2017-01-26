import { Injectable } from '@angular/core';
import { Section } from '../classes/section';
import { Category } from '../classes/category';
import { WarehouseStockItem } from '../classes/warehouse-stock-item';
import * as _ from 'underscore';
import { StockService } from '../../stock.service';
import { AppObserver } from '../classes/app-observer';
import { AppSubject } from '../classes/app-subject';
import { ServiceResponse } from '../classes/service-response';
import { ServiceResponseStatus } from '../classes/service-response-status';

@Injectable()
export class StockItemManagerService implements AppSubject {
    private sectionList: Section[];
    private stockMap;
    private observers: AppObserver[];

    // Variable to make sure the database is loaded before any calls is made
    private isDatabaseLoaded: boolean = false;

    constructor(private stockService: StockService) {
        this.sectionList = [];
        this.stockMap = {};
        this.observers = [];

        if (localStorage != null) {
            let user: string = localStorage.getItem('user');
            switch(user) {
                case 'kerko':
                    this.stockService.initKerkoDB();
                    break;
                case 'khoi':
                    this.stockService.initDB();
                    break;
            }
        } else {
            this.stockService.initTestDB();
        }

        // Now load the list of current items into the stockMap
        this.stockService.getAllItems().then(items => {
            _.each(items, item => {
                this.addItemToStockMap(item, this.stockMap);
            });
        });
    }

    /**
     * Add an observer that will need to react upon changes in the database
     */
    addObserver(observer: AppObserver) {
        this.observers.push(observer);
    }

    /**
     * Notify all observers
     */
    notifyAll() {
        _.each(this.observers, (observer: AppObserver) => {
            console.log('notifying: ' + observer);
            observer.update();
        })
    }

    /**
     * Get the list of items for the category of the given name
     *
     * @param categoryName: the name (lowercase) of the category whose items
     *                      are to be retrieved
     * @return the list of items in this category, [] if there is no item
     *         and null if the category does not exist
     */
    getItemListForCategory(categoryName: string): WarehouseStockItem[] {
        this.stockService.getAllItems().then(items => {
            console.log(items);
        })

        if (!_.contains(_.allKeys(this.stockMap), categoryName)) {
            this.stockMap[categoryName] = [];
        }
        // console.log('stockmap is currently:');
        // console.log(this.stockMap);
        return this.stockMap[categoryName];
    }

    /**
     * Add a new item to the map of stock items. The item will be
     * added to the value array of the given category key
     *
     * @param item: the item to be added to the map
     */
    addNewItem(item: WarehouseStockItem): Promise<ServiceResponse> {
        if (!_.contains(_.allKeys(this.stockMap), item.categoryId)) {
            return Promise.reject('The category does not exist in the database');
        } else {
            this.stockService.addWarehouseItem(item).then( () => {
                this.addItemToStockMap(item, this.stockMap);
                return Promise.resolve(new ServiceResponse(
                    ServiceResponseStatus.OK, 'Item: ' + item.name + ' is added successfully'
                ));
            }).catch( (error: ServiceResponse) => {
                console.log(error);
                return Promise.reject(error);
            });
        }
    }

    addNewCategory(category: Category) {
        this.getAllCategories().then(
            categories => {
                if (!_.contains(categories, category)) {
                    let sectionId = category.sectionId;
                    // THIS IS VERY BAD ALGORITHM
                    for (let i = 0; i < this.sectionList.length; i++) {
                        // Check if the id is the same as the new category's id
                        if (sectionId === this.sectionList[i].name) {
                            // Now add this category to the section
                            this.sectionList[i].addCategory(category);
                            this.stockService.updateSections(this.sectionList).then( () => {
                                this.notifyAll();
                            }).catch( error => {
                                console.log(error)
                            });
                            
                        }
                    }
                } else {
                    console.log('This category already exists: ' + category.name);
                }
            }
        );
    }

    /**
     * Add a new section to the list of managed sections
     *
     * @param section: the section to be added
     */
    addNewSection(section: Section) {
        this.stockService.addSection(section).then( response => {
            console.log(response);
            this.notifyAll();
        }).catch( error => {
            console.log(error);
        });
    }

    getAllCategories(): Promise<Category[]> {
        let categoryList: Category[] = [];

        for (let i = 0; i < this.sectionList.length; i++) {
            let section = this.sectionList[i];

            // Add the list of categories under this section to the
            // categoryList variable
            let categories: Category[] = section.categoryList;
            categoryList = categoryList.concat(categories);
        }

        return Promise.resolve(categoryList);
    }

    /**
     * Retrieve all the sections of this stock, which are actual Section
     * objects with methods defined in the Section class
     *
     * @return    a Promise of the array of sections for this stock.
     *            the order of sections in the array will be random
     */
    getAllSections(): Promise<Section[]> {
        return this.stockService.getAllSections().then( (databaseSections: Section[]) => {
            let finalSectionList: Section[] = [];

            _.each(databaseSections, (section: Section) => {
                // Now setup the actual section objects with methods
                let actualSection = new Section(section.name);
                this.setupCategoryList(actualSection, section.categoryList);
                actualSection.setManager(this);

                finalSectionList.push(actualSection);

            })

            // now update the internal array of sections
            this.sectionList = finalSectionList;

            return finalSectionList;
        });
    }

    public notifyDeleteCategory (category: Category) {

    }
    public notifyDeleteSection (section: Section) {

    }

    /**
     * Set up a section's list of categories, by convertin each JSON category
     * into an actual Category object
     */
    private setupCategoryList(section: Section, categoryList: Category[]) {
        _.each(categoryList, jsonCategory => {
            section.categoryList.push(new Category(
                jsonCategory.name, jsonCategory.sectionId
            ));
        })
    }

    /**
     * Retrieve all the (currently) warehouse items from the database
     * and set up the stockMap field.
     *
     * @return  a promise of the actual map of categories to stock items
     */
    loadItemsFromDatabase() {
        this.stockMap = {};

        this.stockService.getAllItems().then( items => {
            _.each(items, databaseItem => {
                let actualItem = new WarehouseStockItem(
                    databaseItem.name,
                    databaseItem.categoryId,
                    databaseItem.maxAmount,
                    databaseItem.minAmount,
                    databaseItem.unit
                );

                this.addItemToStockMap(actualItem, this.stockMap);
            })
        })
    }
    
    /**
     * Add an item to the a stockMap variable. This will check to make sure 
     * the item is added to the correct category in the stockmap.
     */
    addItemToStockMap(item: WarehouseStockItem, stockMap: any) {
        if (stockMap[item.categoryId] == null) {
            // The category does not exist in the map yet. initialize one now
            stockMap[item.categoryId] = [];
        }
        // Now add the item to the category
        stockMap[item.categoryId].push(item);
    }
}
