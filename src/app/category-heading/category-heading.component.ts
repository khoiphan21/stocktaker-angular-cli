import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-heading',
  templateUrl: './category-heading.component.html',
  styleUrls: ['./category-heading.component.css']
})
export class CategoryHeadingComponent implements OnInit {
  @Input()
  title = 'Category Heading Title';

  constructor() { }

  ngOnInit() {
  }

}
