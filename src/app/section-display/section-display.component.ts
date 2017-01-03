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
  private sections: Section[];

  constructor(
    private stockItemManager: StockItemManagerService
  ) { }

  ngOnInit() {
  }

  // Show/hide the content (the categories under this section)
  toggleContent(section: Section) {
    section.isContentShown = section.isContentShown ? false : true;
  }

}
