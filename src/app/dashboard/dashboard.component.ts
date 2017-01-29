import { Component, OnInit, NgZone } from '@angular/core';
import { DashboardManagerService } from '../shared/managers/dashboard-manager.service';
import { AppObserver } from '../shared/classes/app-observer';
import { StockQuantityManagerService } from '../shared/managers/stock-quantity-manager.service';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { StockService } from '../stock.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AppObserver {
  dashboardTitle = 'DASHBOARD';
  restockTitle = 'TO RE-STOCK';
  stockOverviewTitle = 'STOCK OVERVIEW';

  private lowStockList: WarehouseStockItem[];
  private allItems: WarehouseStockItem[];

  constructor(
    private zone: NgZone,
    private quantityManager: StockQuantityManagerService,
    private stockService: StockService,
    private itemManager: StockItemManagerService
  ) {
    this.lowStockList = [];
    
  }

  ngOnInit() {
    // this.lowStockList = this.quantityManager.getLowStockList();
    this.stockService.addObserver(this);
    this.itemManager.addObserver(this);
  }

  update() {
    // this.lowStockList = this.quantityManager.getLowStockList();
    this.loadLowStockList();
    this.loadAllItems();
  }

  /**
   * Load all items into the list to display under 'Stock Overview'
   */
  private loadAllItems() {
    this.stockService.getAllItems().then(items => {
      this.allItems = items;
    });
  }

  /**
   * Load all the items that are low in stock to be displayed
   */
  private loadLowStockList() {
    this.stockService.getAllItems().then(items => {
      let newList: WarehouseStockItem[] = [];

      _.each(items, item => {
        if (item.currentAmount <= item.minAmount) {
          newList.push(item);
        }
      });

      if (newList.length != 0) {
        this.lowStockList = newList;
      } else {
        this.lowStockList = [];
      }

      this.zone.run(() => {
        
      });

      
      console.log(this.lowStockList);
    });
  }

}
