import { Component, OnInit, Input } from '@angular/core';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  // The model of this item display
  @Input()
  private categoryId: string;
  // The variable controlling whether the list of items is shown
  @Input()
  private isShown: boolean;
  // The list of items to display
  private items: WarehouseStockItem[];

  constructor(
    private stockItemManager: StockItemManagerService
  ) { }

  ngOnInit() {
    this.items = this.stockItemManager.getItemListForCategory(this.categoryId);
    console.log(this.items);
  }

}
