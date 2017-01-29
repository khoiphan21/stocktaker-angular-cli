import { TestBed, inject } from '@angular/core/testing';
import { StockQuantityManagerService } from '../stock-quantity-manager.service';
import { DashboardManagerService } from '../dashboard-manager.service';
import { WarehouseStockItem } from '../../classes/warehouse-stock-item';
import * as _ from 'underscore';

describe('Manager: Stock Quantity Manager', () => {
    let quantityManager: StockQuantityManagerService;

    beforeEach(() => {
        quantityManager = new StockQuantityManagerService(
            new DashboardManagerService()
        );
    });

    it('should add item to the low stock list correctly', () => {
        let item1 = new WarehouseStockItem(
            'Item 1', 'Category 1', 4, 3, 'bag'
        );
        let item2 = new WarehouseStockItem(
            'Item 2', 'Category 1', 6, 5, 'bag'
        );
        quantityManager.setLowStock(item1);
        quantityManager.setLowStock(item2);

        let list = quantityManager.getLowStockList();

        expect(_.contains(list, item1)).toBe(true);
        expect(_.contains(list, item2)).toBe(true);
    });

    it('should remove an item from the low stock list correctly', () => {
        let item1 = new WarehouseStockItem(
            'Item 1', 'Category 1', 4, 3, 'bag'
        );
        let item2 = new WarehouseStockItem(
            'Item 2', 'Category 1', 6, 5, 'bag'
        );
        quantityManager.setLowStock(item1);
        quantityManager.setLowStock(item2);

        // now remove an item
        quantityManager.restock(item1);

        let list = quantityManager.getLowStockList();

        expect(_.contains(list, item2)).toBe(true);
        expect(_.contains(list, item1)).toBe(false);
    });

    it('should update an item in the low stock list correctly', () => {
        let item1 = new WarehouseStockItem(
            'Item 1', 'Category 1', 4, 3, 'bag'
        );
        let item2 = new WarehouseStockItem(
            'Item 2', 'Category 1', 6, 5, 'bag'
        );
        quantityManager.setLowStock(item1);
        quantityManager.setLowStock(item2);

        // Now change the quantity in item1
        item1.currentAmount = 4;
        quantityManager.setLowStock(item1);

        let list = quantityManager.getLowStockList();

        expect(_.contains(list, item2)).toBe(true);
        expect(_.contains(list, item1)).toBe(true);
    })
});
