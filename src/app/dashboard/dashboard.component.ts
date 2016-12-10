import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardTitle = 'DASHBOARD';
  restockTitle = 'TO RE-STOCK';
  stockOverviewTitle = 'STOCK OVERVIEW';

  constructor() { }

  ngOnInit() {
  }

}
