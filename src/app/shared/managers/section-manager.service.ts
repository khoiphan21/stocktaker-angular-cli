import { Injectable } from '@angular/core';
import { Section } from '../classes/section';
import { MainManagerService } from './main-manager.service';
import { Category } from '../classes/category';
import { SimpleList } from '../libraries/collections/simpleList';

@Injectable()
export class SectionManagerService {
    sectionList: SimpleList<Section>;

    constructor(
        private mainManager: MainManagerService
    ) { }

    getAllCategories(): SimpleList<Category> {
        return null;
    }
    getAllSections(): SimpleList<Section> {
        return null;
    }
    notifyChange(category: Category, section: Section) {

    }
    public notifyDeleteCategory (category: Category) {

    }
    public notifyDeleteSection (section: Section) {

    }
}
