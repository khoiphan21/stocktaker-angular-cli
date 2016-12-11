import { Injectable } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Injectable()
export class SideMenuService {
  // The side menu component
  private sideMenu: SideMenuComponent;

  registerSideMenu(sideMenu: SideMenuComponent) {
    this.sideMenu = sideMenu;
  }

  toggleSideMenu() {
    if (this.sideMenu != null) {
      this.sideMenu.toggleSideMenu();
    }
  }

  constructor() { }

}
