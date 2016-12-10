import { Injectable } from '@angular/core';
import { StockItem } from '../classes/stock-item';
import { DashboardManagerService } from './dashboard-manager.service';
import { SimpleList } from '../libraries/collections/simpleList';

@Injectable()
export class StockQuantityManagerService {
    private lowStockList: SimpleList<StockItem>;

    constructor(
        private dashboardManager: DashboardManagerService
    ) {
       this.lowStockList = new SimpleList<StockItem>();
    }

    // Set an item to be in low stock. 
    setLowStock(item: StockItem) {
        this.lowStockList.add(item);
    }
    // Remove the given item from the low stock list, since 
    // it has been re-stocked
    restock(item: StockItem) {
        this.lowStockList.remove(item);
    }
    checkStock() {

    }

}
