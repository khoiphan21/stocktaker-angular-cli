import { Injectable } from '@angular/core';
import { Section } from '../classes/section';
import { Category } from '../classes/category';
import { WarehouseStockItem } from '../classes/warehouse-stock-item';
import * as _ from 'underscore';
import { StockService } from '../../stock.service';
import { AppObserver } from '../classes/app-observer';
import { AppSubject } from '../classes/app-subject';

@Injectable()
export class StockItemManagerService implements AppSubject {
    private sectionList: Section[];
    private stockMap;
    private observers: AppObserver[];

    constructor(private stockService: StockService) {
        this.sectionList = [];
        this.stockMap = {};
        this.observers = [];

        this.setupFakeItemData();

        this.stockService.initDB();
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
            observer.update();
        })
    }

    // Faking the item data
    setupFakeItemData() {
        let amenities = 'Amenities';
        let ingredients = 'Ingredients';

        this.stockMap['Amenities'] = [
            new WarehouseStockItem(
                'Toilet Paper', amenities,
                10, 5, 'roll'
            ),
            new WarehouseStockItem(
                'Gloves', amenities,
                5, 1, 'box'
            )
        ];

        this.stockMap['Ingredients'] = [
            new WarehouseStockItem(
                'Salt', ingredients,
                3, 1, 'bag'
            ),
            new WarehouseStockItem(
                'Soy sauce', ingredients,
                3, 1, 'bottle'
            )
        ];
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
        if (!_.contains(_.allKeys(this.stockMap), categoryName)) {
            this.stockMap[categoryName] = [];
        }
        return this.stockMap[categoryName];
    }

    /**
     * Add a new item to the map of stock items. The item will be
     * added to the value array of the given category key
     *
     * @param item: the item to be added to the map
     */
    addNewItem(item: WarehouseStockItem) {
        let categoryName: string = item.categoryId;

        let itemList: WarehouseStockItem[] = this.getItemListForCategory(categoryName);

        // Add the actual item to the list
        if (itemList != null) {
            itemList.push(item);
        } else {
            console.log('Wrong category name: ' + categoryName);
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
                            this.stockService.updateSections(this.sectionList).catch( error => {
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
            let categories: Category[] = section.getCategoryList();
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

    notifyChange(category: Category, section: Section) {

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
    private loadItemsFromDatabase(): Promise<any> {
        let stockMap = {};

        return Promise.resolve(stockMap);
    }
}
