/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { StockService } from './stock.service';
import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';
import { ServiceResponse } from './shared/classes/service-response';
import { ServiceResponseStatus } from './shared/classes/service-response-status';

describe('Service: Stock (Isolated)', () => {
  let service: StockService;
  beforeEach(() => {
    service = new StockService();
  });

  it('should create a service', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item successfully', done => {
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      'test',
      'test category',
      3, 1, 'test unit'
    );
    service.initDB();

    // Delete any 'test' item that may exist
    service.getItem('test').then(item => {
      if (item != null) {
        service.deleteWareHouseItem(item).then( () => {
          service.addWarehouseItem(testItem).then( response => {
            expect(response.status).toEqual(ServiceResponseStatus.OK);
            done();
          });
        });
      } else {
        expect(false).toBe(true); // will definitely fail
      }
    }).catch( error => {
      // This means that the item is not present yet.
      service.addWarehouseItem(testItem).then( response => {
        expect(response.status).toEqual(ServiceResponseStatus.OK);
      });
    });

    // If control reaches here then all is well
  }, 10000);

  it('should retrieve items successfully', () => {
    service.initDB();
    let allItems;
    service.getAll().then(items => {
      allItems = items;
    });
  });

  it('should retrieve the test item successfully', done => {
    let testItem: WarehouseStockItem;
    service.initDB();
    service.getItem('test').then( item => {
      testItem = item;
      expect(testItem._id).toEqual('test');
      expect(testItem.categoryId).toEqual('test category');
      expect(testItem.name).toEqual('test');
      done();
    });

  }, 10000);
});
