import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/classes/category';
import { Section } from '../shared/classes/section';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

@Component({
  selector: 'app-stock-setup',
  templateUrl: './stock-setup.component.html',
  styleUrls: ['./stock-setup.component.css']
})
export class StockSetupComponent implements OnInit {
  // The list of stock sections
  private sections: Section[];
  // The title shown on the header
  private stockSetupTitle = 'STOCK SETUP';
  // Variable controlling whether the add new menu is shown
  private isAddNewMenuShown = false;
  // Whether the Add New Window is shown
  private addNewType: string;

  constructor(
    private stockItemManager: StockItemManagerService
  ) {
    this.sections = [];
  }
  
  ngOnInit() {
    this.stockItemManager.getAllSections().then(
      sections => this.sections = sections
    );
  }

  showAddNewMenu() {
    this.isAddNewMenuShown = true;
  }
  closeAddNewMenu() {
    this.isAddNewMenuShown = false;
  }

  menuItemSelected(type: string) {
     this.addNewType = type;
  }

  cancelAddNew() {
    this.addNewType = null;
  }
}
