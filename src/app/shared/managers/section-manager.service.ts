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
        
        this.setupFakeData();
        
       
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
