import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../shared/classes/category';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {
  // The category of this display
  @Input() 
  private category: Category;
  // The list of items to be displayed
  private stockItems: WarehouseStockItem[];
  // Variable to control whether the list of items is shown
  private isContentShown = false;

  constructor(
    private stockItemManager: StockItemManagerService
  ) { }

  ngOnInit() {
    this.stockItems = this.stockItemManager.getItemListForCategory(this.category.name);
  }

  toggleItemDisplay() {
    this.isContentShown = this.isContentShown ? false : true;
  }

}
