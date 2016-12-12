import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/classes/category';
import { Section } from '../shared/classes/section';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';

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
    private stockItemManager: StockItemManagerService
  ) {
    this.sections = [];
  }
  
  ngOnInit() {
    this.stockItemManager.getAllSections().then(
      sections => this.sections = sections
    );
  }
}
