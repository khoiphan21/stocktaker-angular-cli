import { Component, OnInit } from '@angular/core';
import { Section } from '../shared/classes/section';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { AppObserver } from '../shared/classes/app-observer';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';
import * as _ from 'underscore';

@Component({
  selector: 'app-stock-take-warehouse',
  templateUrl: './stock-take-warehouse.component.html',
  styleUrls: ['./stock-take-warehouse.component.css']
})
export class StockTakeWarehouseComponent implements OnInit, AppObserver {
  // Header title
  private stockTakeTitle = 'STOCKTAKE';
  // The list of stock sections
  private sections: Section[];

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
    )
  }

  /**
   * Send the current stock information to the database, as well as update the 
   * stock-taking history database
   */
  recordStock() {
    this.stockItemManager.updateAllItemAmount();
    this.stockItemManager.recordStockTakeHistory();
  }

  // Show/hide the content (the categories under this section)
  toggleSectionContent(section: Section) {
    section.isContentShown = section.isContentShown ? false : true;
  }

  /**
   * Call this method to notify this component that there has been a change
   * in the database. 
   */
  update() {
    console.log('getting updated');
    // Reload the list of sections
    this.stockItemManager.getAllSections().then(
      sections => {
        this.sections = sections;
      }
    );
  }

}
