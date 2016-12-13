import { Injectable, OnInit } from '@angular/core';
import { Section } from '../classes/section';
import { Category } from '../classes/category';
import { SimpleList } from '../libraries/collections/simpleList';
import { StockItem } from '../classes/stock-item';
import * as _ from 'underscore';

@Injectable()
export class StockItemManagerService {
    private sectionList: Section[];
    private stockMap;

    constructor() {
        this.sectionList = [];
        this.stockMap = {};
        
        this.setupFakeData();
        this.setupFakeItemData();
    }

    // Faking the item data
    setupFakeItemData() {
        let amenities = "Amenities";
        let ingredients = "Ingredients";

        this.stockMap["Amenities"] = [
            new StockItem(
                "Toilet Paper", amenities,
                10, 5, "roll"
            ),
            new StockItem(
                "Gloves", amenities, 
                5, 1, "box"
            )
        ];

        this.stockMap["Ingredients"] = [
            new StockItem(
                "Salt", ingredients,
                3, 1, "bag"
            ),
            new StockItem(
                "Soy sauce", ingredients, 
                3, 1, "bottle"
            )
        ]
    }

    // Setup the fake data for all sections and categories
    // This will be replaced by actual server calls later
    setupFakeData() {
        // CREATING A SAMPLE SET OF SECTIONS
        // IN THE FUTURE WILL BE REPLACED BY A BACKEND SERVICE    
        let warehouse: Section;
        warehouse = new Section('warehouse');
        warehouse.setManager(this);
        warehouse.addCategory(new Category(this, "Amenities", warehouse));
        warehouse.addCategory(new Category(this, "Ingredients", warehouse));

        let sales: Section;
        sales = new Section('sales');
        sales.setManager(this);
        sales.addCategory(new Category(this, "Vegetarian Spring Rolls", sales));
        sales.addCategory(new Category(this, "Pork Spring Rolls", sales));
        sales.addCategory(new Category(this, "Beef Spring Rolls", sales));
        

        this.sectionList.push(warehouse);
        this.sectionList.push(sales);
    }
    
    /**
     * Get the list of items for the category of the given name
     * 
     * @param categoryName: the name of the category whose items 
     *                      are to be retrieved
     */
    getItemListForCategory(categoryName: string) {
        if (_.contains(_.allKeys(this.stockMap), categoryName)) {
            return this.stockMap[categoryName];
        }
    }
    
    /**
     * Add a new item to the map of stock items. The item will be 
     * added to the value array of the given category key
     * 
     * @param item: the item to be added to the map
     */
    addNewItem(item: StockItem) {
        let categoryName: string = item.categoryId;
        
        let itemList: StockItem[] = this.getItemListForCategory(categoryName);

        // Add the actual item to the list
        if (itemList != null) {
            itemList.push(item);
        } else {
            console.log('Wrong category name: ' + categoryName);
        }
    }

    getAllCategories(): SimpleList<Category> {
        return null;
    }
    getAllSections(): Promise<Section[]> {
        return Promise.resolve(this.sectionList);
    }
    notifyChange(category: Category, section: Section) {

    }
    public notifyDeleteCategory (category: Category) {

    }
    public notifyDeleteSection (section: Section) {

    }
}
