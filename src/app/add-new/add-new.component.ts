import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  // Variables to control which component to be displayed
  private isTypeItem = false;
  private isTypeCategory = false;
  private isTypeSection = false;

  @Input()
  private type: string;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.type = null;
  }

}
