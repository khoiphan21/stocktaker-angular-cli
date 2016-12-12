import { Component, OnInit, Input } from '@angular/core';
import { Section } from '../shared/classes/section';
import { Category } from '../shared/classes/category';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

@Component({
  selector: 'app-section-display',
  templateUrl: './section-display.component.html',
  styleUrls: ['./section-display.component.css']
})
export class SectionDisplayComponent implements OnInit {
  // The section object for this section display
  @Input()
  private section: Section;
  // The list of categories under this section
  private categories: Category[];
  // Variable to control whether the content is shown
  private isContentShown = false; // initially content is not shown

  constructor(
    private stockItemManager: StockItemManagerService
  ) { }

  ngOnInit() {
    this.categories = this.section.getCategoryList();
  }

  // Show/hide the content (the categories under this section)
  toggleContent() {
    this.isContentShown = this.isContentShown ? false : true;
  }

}
