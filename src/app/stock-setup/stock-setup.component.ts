import { Component, OnInit } from '@angular/core';
import { Section } from '../shared/classes/section';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { AppObserver } from '../shared/classes/app-observer';

@Component({
  selector: 'app-stock-setup',
  templateUrl: './stock-setup.component.html',
  styleUrls: ['./stock-setup.component.css']
})
export class StockSetupComponent implements OnInit, AppObserver {
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
    // Add itself to the list of observers in the stock item manager
    this.stockItemManager.addObserver(this);

    this.stockItemManager.getAllSections().then(
      sections => this.sections = sections
    );
  }

  changeTitle(title: string) {
    this.stockSetupTitle = title;
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

  /**
   * Call this method to notify this component that there has been a change
   * in the database. 
   */
  update() {
    // Reload the list of sections
    this.stockItemManager.getAllSections().then(
      sections => this.sections = sections
    );
  }
}
