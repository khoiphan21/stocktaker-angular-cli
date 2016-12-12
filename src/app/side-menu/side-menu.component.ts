import { SideMenuService } from '../side-menu.service';
import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  animations: [
    trigger('sideMenuState', [
      state('active', style ({
        left: 0,
        transform: 'scale(1)'
      })),
      state('inactive', style({
        left: '-100vw',
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class SideMenuComponent implements OnInit {
  private sideMenuState = 'inactive';

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
    this.sideMenuService.registerSideMenu(this);
  }

  toggleSideMenu() {
    if (this.sideMenuState === 'active') {
      this.sideMenuState = 'inactive';
    } else {
      this.sideMenuState = 'active';
    }
  }

}
