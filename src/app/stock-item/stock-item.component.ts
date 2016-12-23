import { Component, OnInit, Input } from '@angular/core';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  // The model of this item display
  @Input()
  private item: WarehouseStockItem;

  changeName(name: string) {
    this.item.name = name;
  }

  constructor() { }

  ngOnInit() {
  }

}
