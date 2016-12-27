import { Category } from './category';
import * as _ from 'underscore';
import { StockItemManagerService } from '../managers/stock-item-manager.service';

export class Section {
    name: string;
    categoryList: Category[];
    stockItemManager;

    /**
     * Constructor for a section. 
     * 
     * @param name: the name of this section
     */
    constructor(name: string) {
        this.categoryList = [];
        this.name = name;
    }

    /**
     * Give the section a handle on the observer - the Section Manager, which
     * manages the interactions between sections and categories
     * 
     * @param manager: the Section Manager
     */
    setManager(manager: StockItemManagerService) {
        this.stockItemManager = manager;
    }

    // NOTE: NOT TESTED
    addCategory(category: Category) {
        if (!_.contains(this.categoryList, category)) {
            this.categoryList.push(category);
        }
    }
    // THIS IS VERY DANGEROUS.
    getCategoryList(): Category[] {
        return this.categoryList;
    }

}
