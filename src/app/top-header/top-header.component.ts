import { Component, OnInit, Input } from '@angular/core';
import { SideMenuService } from '../side-menu.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  @Input()
  title = 'Top Header';

  toggleSideMenu() {
    this.sideMenuService.toggleSideMenu();
  }

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
  }

}
