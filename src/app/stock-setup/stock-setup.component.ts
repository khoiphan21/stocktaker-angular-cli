import { Component, OnInit } from '@angular/core';
import { SectionManagerService } from '../shared/managers/section-manager.service';
import { Category } from '../shared/classes/category';
import { Section } from '../shared/classes/section';

@Component({
  selector: 'app-stock-setup',
  templateUrl: './stock-setup.component.html',
  styleUrls: ['./stock-setup.component.css']
})
export class StockSetupComponent implements OnInit {
  private categories: Category[];
  private testCategoryName: String;

  stockSetupTitle = 'STOCK SETUP';
  warehouseTitle = "WAREHOUSE";
  salesTitle = "SALES";

  constructor(
    private sectionManager: SectionManagerService
  ) { }

  test() {
    this.showWarehouseSection();
  }

  showWarehouseSection() {
    let allSections : Section[];
    this.sectionManager.getAllSections().then(
      section => {
        allSections = section;
        // Load the list of categories in this section
        this.categories = allSections[0].getCategoryList();

      }
    );
    
    
  }

  ngOnInit() {
  }

}
