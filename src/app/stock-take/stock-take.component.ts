import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.css']
})
export class StockTakeComponent implements OnInit {
  // Header title
  private stockTakeTitle = 'STOCKTAKE';

  constructor() { }

  ngOnInit() {
  }

}
