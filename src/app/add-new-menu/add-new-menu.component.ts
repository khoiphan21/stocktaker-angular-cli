import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-menu',
  templateUrl: './add-new-menu.component.html',
  styleUrls: ['./add-new-menu.component.css']
})
export class AddNewMenuComponent implements OnInit {
  @Output()
  onSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // This method is called when a menu item is selected
  showAddNew(type: string) {
    this.onSelected.emit(type);
  }

}
