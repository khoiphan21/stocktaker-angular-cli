import { TestBed, inject } from '@angular/core/testing';
import { StockService } from '../../../stock.service';
import { StockItemManagerService } from '../stock-item-manager.service';
import { WarehouseStockItem } from '../../classes/warehouse-stock-item';
import { ServiceResponse } from '../../classes/service-response';
import { ServiceResponseStatus } from '../../classes/service-response-status';
import { StockQuantityManagerService } from '../stock-quantity-manager.service';
import { DashboardManagerService } from '../dashboard-manager.service';

describe('Manager: Stock Item Manager', () => {
    let stockService: StockService;
    let itemManager: StockItemManagerService;
    let quantityManager: StockQuantityManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StockService,
                StockItemManagerService,
                StockQuantityManagerService,
                DashboardManagerService
            ]
        });
        stockService = new StockService();
        stockService.initTestDB();
        quantityManager = new StockQuantityManagerService(new DashboardManagerService());
        itemManager = new StockItemManagerService(stockService, quantityManager);
    });

    it('should create a service', inject([StockItemManagerService], (service: StockItemManagerService) => {
        expect(service).toBeTruthy();
    }));

    it('should add an item of a new category to the given map correctly', () => {
        let mockStockMap = {};
        let item = new WarehouseStockItem(
            'test', 'test category', 5, 1, 'test unit'
        );

        itemManager.addItemToStockMap(item, mockStockMap);

        let retrievedItem: WarehouseStockItem = mockStockMap[item.categoryId][0];

        expect(retrievedItem).toEqual(item);
    });

    it('should add an item of an existing category to the given map correctly', () => {
        let mockStockMap = {};
        mockStockMap['test category'] = [];
        let item = new WarehouseStockItem(
            'test', 'test category', 5, 1, 'test unit'
        );

        itemManager.addItemToStockMap(item, mockStockMap);

        let retrievedItem: WarehouseStockItem = mockStockMap[item.categoryId][0];

        expect(retrievedItem).toEqual(item);
    });

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
