import { SimpleList } from '../libraries/collections/simpleList';
import { Category } from './category';
import * as _ from 'underscore';
import { StockItemManagerService } from '../managers/stock-item-manager.service';

export class Section {
    private _name: string;
    private _categoryList: Category[];
    private stockItemManager;
    
    /**
     * Constructor for a section. 
     * 
     * @param name: the name of this section
     */
    constructor(name: string) {
        this._categoryList = [];
        this._name = name;
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
        if (!_.contains(this._categoryList, category)) {
            this._categoryList.push(category);
        }
    }
    // THIS IS VERY DANGEROUS.
    getCategoryList(): Category[] {
        return this._categoryList;
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
}
