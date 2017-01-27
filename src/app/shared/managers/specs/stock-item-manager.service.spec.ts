import { TestBed, inject } from '@angular/core/testing';
import { StockService } from '../../../stock.service';
import { StockItemManagerService } from '../stock-item-manager.service';
import { WarehouseStockItem } from '../../classes/warehouse-stock-item';
import { ServiceResponse } from '../../classes/service-response';
import { ServiceResponseStatus } from '../../classes/service-response-status';

describe('Manager: Stock Item Manager', () => {
    let stockService: StockService;
    let itemManager: StockItemManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StockService,
                StockItemManagerService
            ]
        });
        stockService = new StockService();
        stockService.initTestDB();
        itemManager = new StockItemManagerService(stockService);
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

    it('should load items from the database correctly', done => {
        setTimeout(() => {
            itemManager.printStockMap();
            // if nothing is wrong, then should be okay
            done();
        }, 3000)
    });

    it('should update all items amount successfully',
    inject([StockItemManagerService], (service: StockItemManagerService) => {
        itemManager.loadItemsFromDatabase().then(() => {
            // itemManager.printStockMap();
            itemManager.updateAllItemAmount();
            // if control reaches here then all is well
        });
    }));
        
});
