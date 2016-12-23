/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SectionDisplayComponent } from './section-display.component';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { StockService } from '../stock.service';

describe('Component: SectionDisplay', () => {
  it('should create an instance', () => {
    let component = new SectionDisplayComponent(
      new StockItemManagerService(new StockService())
    );
    expect(component).toBeTruthy();
  });
});
