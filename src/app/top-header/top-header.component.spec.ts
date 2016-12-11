/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TopHeaderComponent } from './top-header.component';
import { SideMenuService } from '../side-menu.service';

describe('Component: TopHeader', () => {
  it('should create an instance', () => {
    let component = new TopHeaderComponent(new SideMenuService());
    expect(component).toBeTruthy();
  });
});
