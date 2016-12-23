/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { StockSetupComponent } from './stock-setup.component';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { StockService } from '../stock.service';

describe('Component: StockSetup', () => {
  it('should create an instance', () => {
    let component = new StockSetupComponent(
      new StockItemManagerService(new StockService())
    );
    expect(component).toBeTruthy();
  });
});
