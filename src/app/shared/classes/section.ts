import { SectionManagerService } from '../managers/section-manager.service';
import { SimpleList } from '../libraries/collections/simpleList';
import { Category } from './category';
import * as _ from 'underscore';

export class Section {
    private _name: string;
    private _categoryList: Category[];
    private sectionManager;
    
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
    setManager(manager: SectionManagerService) {
        this.sectionManager = manager;
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

    getName(): String {
        return this._name;
    }
    changeName(value: string) {
        this._name = value;
    }
}
