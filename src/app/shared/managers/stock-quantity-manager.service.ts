import { Injectable } from '@angular/core';
import { WarehouseStockItem } from '../classes/warehouse-stock-item';
import { DashboardManagerService } from './dashboard-manager.service';
import * as _ from 'underscore';
import { AppSubject } from '../classes/app-subject';
import { AppObserver } from '../classes/app-observer';

@Injectable()
export class StockQuantityManagerService implements AppSubject {
    private lowStockList: WarehouseStockItem[];

    // The list of observers of this service
    private observers: AppObserver[];

    constructor() {
       this.lowStockList = [];
       this.observers = [];
    }

    // Set an item to be in low stock. 
    setLowStock(item: WarehouseStockItem) {
        let doesItemExist = false;
        // Check if the item already exists in the stock. If it does
        // exist, then update the amount only
        _.each(this.lowStockList, listItem => {
            if (listItem._id === item._id) {
                listItem.currentAmount = item.currentAmount;
                doesItemExist = true;
            }
        });

        // If control reaches here, the item is not yet in the list
        if (!doesItemExist) {
            this.lowStockList.push(item);
        }

        this.notifyAll();
    }
    // Remove the given item from the low stock list, since 
    // it has been re-stocked
    restock(item: WarehouseStockItem) {
        let newList = _.filter(this.lowStockList, listItem => {
            return listItem._id != item._id;
        });
        this.lowStockList = newList;
        
        this.notifyAll();
    }
    
    /**
     * Return the list of items that are low in stock
     */
    getLowStockList(): WarehouseStockItem[] {
        return this.lowStockList;
    }
    
    addObserver(observer: AppObserver) {
        this.observers.push(observer);
    }

    notifyAll() {
        _.each(this.observers, observer => {
            observer.update();
        })
    }
}
