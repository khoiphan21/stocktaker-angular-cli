/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CategoryDisplayComponent } from './category-display.component';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { StockService } from '../stock.service';

describe('Component: CategoryDisplay', () => {
  it('should create an instance', () => {
    let component = new CategoryDisplayComponent(
      new StockItemManagerService(new StockService())
    );
    expect(component).toBeTruthy();
  });
});
