import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WarehouseStockItem } from '../shared/classes/warehouse-stock-item';
import { StockItemManagerService } from '../shared/managers/stock-item-manager.service';
import { Category } from '../shared/classes/category';
import { Section } from '../shared/classes/section';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  @Input()
  private type: string;

  // The list of categories 
  private categories: Category[];
  // The list of sections
  private sections: Section[];

  // The variables holding the user Input
  private name: string;
  private unit: string;
  private max: number;
  private min: number;
  private categoryId: string;
  private sectionId: string;

  // Event emitter to let the parent now that the user has cancelled
  // add new window
  @Output()
  onCancel = new EventEmitter();

  constructor(
    private stockItemManagerService: StockItemManagerService
  ) { }

  ngOnInit() {
    this.stockItemManagerService.getAllCategories().then(
      categories => {
        this.categories = categories;
      }
    );
    this.stockItemManagerService.getAllSections().then(
      sections => this.sections = sections
    );
  }

  cancel() {
    this.type = null;
    this.onCancel.emit();
  }

  /**
   * Add a new item/category/section to the stock, depending on the
   * current type of this.type
   */
  addNew() {
    switch (this.type) {
      case 'item':
        if (this.name != null && this.categoryId != null
            && this.max != null && this.min != null && this.unit != null) {
          let item: WarehouseStockItem = new WarehouseStockItem(
            this.name,
            this.categoryId,
            this.max, this.min, this.unit
          );
          // Add the actual item to the service
          this.stockItemManagerService.addNewItem(item);
        } else {
          console.log('Wrong category Id: ' + this.categoryId);
        }
        break;
      case 'category':
        if (this.name != null && this.sectionId != null) {
          let category: Category = new Category(
              this.name, this.sectionId
            );
          this.stockItemManagerService.addNewCategory(category);
        } else {
          console.log('Wrong section id: ' + this.sectionId);
        }
        break;

      case 'section':
        if (this.name != null) {
          let section: Section = new Section(this.name);
          this.stockItemManagerService.addNewSection(section);
        }
        break;
      default:
        console.log('wrong type');
    }

    // Now close the popup
    this.cancel();
  }

  /**
   * Temporarily navigate to another page to let the user select 
   * which category the item belongs to
   */
  selectCategory() {

  }

}
