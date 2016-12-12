import { Injectable, OnInit } from '@angular/core';
import { Section } from '../classes/section';
import { MainManagerService } from './main-manager.service';
import { Category } from '../classes/category';
import { SimpleList } from '../libraries/collections/simpleList';

@Injectable()
export class SectionManagerService {
    sectionList: Section[];

    constructor(
        private mainManager: MainManagerService
    ) {
        this.sectionList = [];

        // CREATING A SAMPLE SET OF SECTIONS
        // IN THE FUTURE WILL BE REPLACED BY A BACKEND SERVICE    
        let warehouse: Section;
        warehouse = new Section(this);
        warehouse.addCategory(new Category(this, "Amenities", warehouse));
        warehouse.addCategory(new Category(this, "Ingredients", warehouse));

        this.sectionList.push(warehouse);
       
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
