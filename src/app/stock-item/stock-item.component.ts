import { Component, OnInit, Input } from '@angular/core';
import { StockItem } from '../shared/classes/stock-item';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  // The model of this item display
  @Input()
  private stockItem: StockItem;

  constructor() { }

  ngOnInit() {
  }

}
