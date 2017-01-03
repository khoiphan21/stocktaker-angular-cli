import { TestBed, inject } from '@angular/core/testing';
import { StockService } from '../../../stock.service';
import { StockItemManagerService } from '../stock-item-manager.service';
import { WarehouseStockItem } from '../../classes/warehouse-stock-item';
import { ServiceResponse } from '../../classes/service-response';
import { ServiceResponseStatus } from '../../classes/service-response-status';

describe('Manager: Stock Item Manager', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StockService,
                StockItemManagerService
            ]
        });
    });

    it('should create a service', inject([StockItemManagerService], (service: StockItemManagerService) => {
        expect(service).toBeTruthy();
    }));

    it('should add an item of a new category to the given map correctly', 
    inject([StockItemManagerService], (service: StockItemManagerService) => {
        let mockStockMap = {};
        let item = new WarehouseStockItem(
            'test', 'test category', 5, 1, 'test unit'
        );

        service.addItemToStockMap(item, mockStockMap);

        let retrievedItem: WarehouseStockItem = mockStockMap[item.categoryId][0];

        expect(retrievedItem).toEqual(item);
    }));

    it('should add an item of an existing category to the given map correctly', 
    inject([StockItemManagerService], (service: StockItemManagerService) => {
        let mockStockMap = {};
        mockStockMap['test category'] = [];
        let item = new WarehouseStockItem(
            'test', 'test category', 5, 1, 'test unit'
        );

        service.addItemToStockMap(item, mockStockMap);

        let retrievedItem: WarehouseStockItem = mockStockMap[item.categoryId][0];

        expect(retrievedItem).toEqual(item);
    }));


});
