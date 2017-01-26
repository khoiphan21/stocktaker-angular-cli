import { Component, OnInit, Input } from '@angular/core';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';

@Component({
  selector: 'app-stocktake-item',
  templateUrl: './stocktake-item.component.html',
  styleUrls: ['./stocktake-item.component.css']
})
export class StocktakeItemComponent implements OnInit {
  // The id of the category model for this display
  @Input()
  private categoryId: string;

  // variable controlling whether the list of items is shown
  @Input()
  private isShown: boolean;

  // The list of items to display
  private items: WarehouseStockItem[];

  constructor(
    private stockItemManager: StockItemManagerService
  ) { }

  ngOnInit() {
    this.items = this.stockItemManager.getItemListForCategory(this.categoryId);
  }

}
