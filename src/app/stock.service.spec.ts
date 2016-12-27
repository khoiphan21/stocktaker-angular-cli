/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StockService } from './stock.service';
import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';

describe('Service: Stock (Isolated)', () => {
  let service: StockService;
  beforeEach(() => {
    service = new StockService();
  });

  it('should create a service', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item successfully', () => {
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      'test',
      'test category',
      3, 1, 'test unit'
    );
    service.initDB();
    service.addWarehouseItem(testItem);

    // If control reaches here then all is well
    expect(service).toBeTruthy();
  });

  it('should retrieve items successfully', () => {
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      'test',
      'test category',
      3, 1, 'test unit'
    );
    service.initDB();
    let allItems;
    service.getAll().then(items => {
      allItems = items;
      console.log(allItems);
    });
  });

  it('should retrieve async items with the correct properties', done => {
    let name = 'test name';
    let categoryId = 'test category';
    let max = 3;
    let min = 1;
    let unit = 'test unit';
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      name, categoryId, max, min, unit
    );
    let service: StockService = new StockService();

    service.initDB();
    service.addWarehouseItem(testItem);
    let retrievedItem: WarehouseStockItem;
    service.getAll().then(items => {
      retrievedItem = items[0];
      expect(retrievedItem).toBeTruthy();
      expect(retrievedItem.name).toEqual(name);
      expect(retrievedItem.categoryId).toEqual(categoryId);
      expect(retrievedItem.maxAmount).toEqual(max);
      expect(retrievedItem.minAmount).toEqual(min);
      expect(retrievedItem.unit).toEqual(unit);
      done();
    });
  });

});
