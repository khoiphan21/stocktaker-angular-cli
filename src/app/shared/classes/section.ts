import { SectionManagerService } from '../managers/section-manager.service';
import { SimpleList } from '../libraries/collections/simpleList';
import { Category } from './category';
import * as _ from 'underscore';

export class Section {
    private _name: String;
    private _categoryList: Category[];

    // NOTE: NOT TESTED
    addCategory(category: Category) {
        if (!_.contains(this._categoryList, category)) {
            this._categoryList.push(category);
        }
    }
    // THIS IS VERY DANGEROUS
    getCategoryList(): Category[] {
        return this._categoryList;
    }

    getName(): String {
        return this._name;
    }
    changeName(value: String) {
        this._name = value;
    }

    constructor(private manager: SectionManagerService) {
        this._categoryList = [];
    }
}
