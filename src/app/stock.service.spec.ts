/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StockService } from './stock.service';
import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';

describe('Service: Stock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService]
    });
  });

  it('should ...', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));

  it('should add a new item successfully', inject([StockService], (service: StockService) => {
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      'test',
      'test category',
      3, 1, 'test unit'
    )
    service.initDB();
    service.addWarehouseItem(testItem);

    // If control reaches here then all is well
    expect(service).toBeTruthy();
  }));
  
  it('should retrieve items successfully', inject([StockService], (service: StockService) => {
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      'test',
      'test category',
      3, 1, 'test unit'
    )
    service.initDB();
    service.addWarehouseItem(testItem);
    let allItems;
    service.getAll().then(items => {
      allItems = items;
      console.log(allItems);
    });
  }));

});
