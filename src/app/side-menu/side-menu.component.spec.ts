/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { SideMenuService } from '../side-menu.service';

describe('Component: SideMenu', () => {
  it('should create an instance', () => {
    let component = new SideMenuComponent(new SideMenuService());
    expect(component).toBeTruthy();
  });
});
