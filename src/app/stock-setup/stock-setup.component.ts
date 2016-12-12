import { Component, OnInit } from '@angular/core';
import { SectionManagerService } from '../shared/managers/section-manager.service';
import { Category } from '../shared/classes/category';
import { Section } from '../shared/classes/section';

@Component({
  selector: 'app-stock-setup',
  templateUrl: './stock-setup.component.html',
  styleUrls: ['./stock-setup.component.css']
})
export class StockSetupComponent implements OnInit {
  // The list of stock sections
  private sections: Section[];
  // The title shown on the header
  private stockSetupTitle = 'STOCK SETUP';

  constructor(
    private sectionManager: SectionManagerService
  ) {
    this.sections = [];
  }
  
  ngOnInit() {
    this.sectionManager.getAllSections().then(
      sections => this.sections = sections
    );
  }
}
