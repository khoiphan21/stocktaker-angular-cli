import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  @Input()
  private type: string;

  // Event emitter to let the parent now that the user has cancelled
  // add new window
  @Output()
  onCancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
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

  }

  /**
   * Temporarily navigate to another page to let the user select 
   * which category the item belongs to
   */
  selectCategory() {

  }

}
