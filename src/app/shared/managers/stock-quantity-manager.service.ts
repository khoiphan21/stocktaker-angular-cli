import { Injectable } from '@angular/core';
import { WarehouseStockItem } from '../classes/warehouse-stock-item';
import { DashboardManagerService } from './dashboard-manager.service';
import { SimpleList } from '../libraries/collections/simpleList';

@Injectable()
export class StockQuantityManagerService {
    private lowStockList: SimpleList<WarehouseStockItem>;

    constructor(
        private dashboardManager: DashboardManagerService
    ) {
       this.lowStockList = new SimpleList<WarehouseStockItem>();
    }

    // Set an item to be in low stock. 
    setLowStock(item: WarehouseStockItem) {
        this.lowStockList.add(item);
    }
    // Remove the given item from the low stock list, since 
    // it has been re-stocked
    restock(item: WarehouseStockItem) {
        this.lowStockList.remove(item);
    }
    checkStock() {

    }

}
