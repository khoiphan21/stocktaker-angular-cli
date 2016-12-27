import { TestBed, inject } from '@angular/core/testing';
import { StockService } from '../../../stock.service';
import { StockItemManagerService } from '../stock-item-manager.service';
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

});
