import { Component, OnInit, Input } from '@angular/core';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';

@Component({
  selector: 'app-category-heading',
  templateUrl: './category-heading.component.html',
  styleUrls: ['./category-heading.component.css']
})
export class CategoryHeadingComponent implements OnInit {
  // The title of this category
  @Input()
  private title = 'Category Heading Title';
  // The list of stock items in this category
  private items: WarehouseStockItem[];

  // Variable to control whether the arrow should appear,
  // default to true
  @Input()
  private isArrowShown: boolean;


  constructor() {
    this.items = [];
    this.isArrowShown = true;
   }

  ngOnInit() {
    
  }

}
