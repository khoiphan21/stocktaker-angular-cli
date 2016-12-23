import { Injectable } from '@angular/core';
import { Section } from '../classes/section';
import { Category } from '../classes/category';
import { WarehouseStockItem } from '../classes/warehouse-stock-item';
import * as _ from 'underscore';
import { StockService } from '../../stock.service';

@Injectable()
export class StockItemManagerService {
    private sectionList: Section[];
    private stockMap;

    constructor(private stockService: StockService) {
        this.sectionList = [];
        this.stockMap = {};

        this.setupFakeData();
        this.setupFakeItemData();

        this.stockService.initDB();
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

    // Setup the fake data for all sections and categories
    // This will be replaced by actual server calls later
    setupFakeData() {
        // CREATING A SAMPLE SET OF SECTIONS
        // IN THE FUTURE WILL BE REPLACED BY A BACKEND SERVICE    
        let warehouse: Section;
        warehouse = new Section('warehouse');
        warehouse.setManager(this);
        warehouse.addCategory(new Category('Amenities', warehouse.name));
        warehouse.addCategory(new Category('Ingredients', warehouse.name));

        let sales: Section;
        sales = new Section('sales');
        sales.setManager(this);
        sales.addCategory(new Category('Vegetarian Spring Rolls', sales.name));
        sales.addCategory(new Category('Pork Spring Rolls', sales.name));
        sales.addCategory(new Category('Beef Spring Rolls', sales.name));


        this.sectionList.push(warehouse);
        this.sectionList.push(sales);
    }

    /**
     * Get the list of items for the category of the given name
     * 
     * @param categoryName: the name of the category whose items 
     *                      are to be retrieved
     * @return the list of items in this category, [] if there is no item
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
        this.sectionList.push(section);
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
