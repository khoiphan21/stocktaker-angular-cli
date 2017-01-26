import { Component, OnInit } from '@angular/core';
import { Section } from '../shared/classes/section';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { AppObserver } from '../shared/classes/app-observer';

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
