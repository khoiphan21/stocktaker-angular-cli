/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AddNewComponent } from './add-new.component';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { StockService } from '../stock.service';

describe('Component: AddNew', () => {
  it('should create an instance', () => {
    let component = new AddNewComponent(
      new StockItemManagerService(new StockService())
    );
    expect(component).toBeTruthy();
  });
});
