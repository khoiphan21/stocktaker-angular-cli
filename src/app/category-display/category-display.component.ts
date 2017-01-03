import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Category } from '../shared/classes/category';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit, OnChanges {
  // The category of this display
  @Input()
  private categoryList: Category[];
  // Variable to determine whether the categories are shown
  @Input()
  private isShown: boolean;

  constructor(
    private stockItemManager: StockItemManagerService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  toggleItemDisplay(category: Category) {
    category.isContentShown = category.isContentShown ? false : true;
  }

}
