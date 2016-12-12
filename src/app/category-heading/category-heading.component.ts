import { Component, OnInit, Input } from '@angular/core';
import { StockItem } from '../shared/classes/stock-item';

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
  private items: StockItem[];


  constructor() {
    this.items = [];
   }

  ngOnInit() {
    
  }

}
