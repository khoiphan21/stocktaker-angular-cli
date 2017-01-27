/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { StockService } from './stock.service';
import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';
import { ServiceResponse } from './shared/classes/service-response';
import { ServiceResponseStatus } from './shared/classes/service-response-status';
import { Section } from './shared/classes/section';

describe('Service: Stock (Isolated)', () => {
  let service: StockService;
  beforeEach(() => {
    service = new StockService();
    service.initTestDB();
  });

  it('should create a service', () => {
    expect(service).toBeTruthy();
  });

  /************************
   * TESTS RELATED TO ITEMS
   ************************/ 
  it('should add a new item successfully, then delete it', done => {
    let testItem: WarehouseStockItem = new WarehouseStockItem(
      'test',
      'test category',
      3, 1, 'test unit'
    );

    service.addWarehouseItem(testItem).then( response => {
      expect(response.status).toEqual(ServiceResponseStatus.OK);

      // Now delete the test item to prevent confusion
      service.deleteWareHouseItem(testItem);

      done();
    }).catch( error => {
      console.log(error);
      expect(false).toBe(true); // Test will definitely fail
      done();
    });
  }, 10000);

  it('should retrieve items successfully', done => {
    let allItems;
    service.getAllItems().then(items => {
      // if control reaches here, then all is well
      console.log(items);
      done();
    }).catch(error => {
      expect(false).toBe(true);
      console.log(error);
      done();
    });
  });

  /***************************
   * TESTS RELATED TO SECTIONS
   ***************************/ 
  it('should be able to retrieve the array of sections', done => {
    service.getAllSections().then(sections => {
      console.log(sections);
      done();
    });
  });

  it('should not be able to add a duplicate section', done => {
    let duplicateSection = new Section('Duplicate Section');
    service.addSection(duplicateSection);
    
    setTimeout(() => {
      service.addSection(duplicateSection).then(response => {
        expect(response.status).toBe(ServiceResponseStatus.ERROR);
        done();
        service.deleteSection(duplicateSection);
      })
    }, 4000)
    
  }, 10000);

  it('should be able to add a new section', done => {
    let testSection = new Section('Test Section');
    service.addSection(testSection).then(response => {
      expect(response.status).toBe(ServiceResponseStatus.OK);
      
      // Now send the command to delete the section to prevent duplicates
      service.deleteSection(testSection);

      done();
    });
  });

  it('should be able to delete a section', done => {
    let testSection = new Section('Section to be deleted');
    service.addSection(testSection).then( response => {
      return Promise.all([response, service.deleteSection(testSection)])
    }).then ( responses => {
      expect(responses[0].status).toBe(ServiceResponseStatus.OK);
      expect(responses[1].status).toBe(ServiceResponseStatus.OK);
      done();
    }).catch( error => {
      console.log(error);
      expect(false).toBe(true); // will definitely fail
      done();
    });
  }, 10000);

  it('should retrieve a history correctly', done => {
    let testSection = new Section('warehouse');
    service.getHistory(testSection.name).then(history => {
      console.log(history);
      done();
    });
  });
});
