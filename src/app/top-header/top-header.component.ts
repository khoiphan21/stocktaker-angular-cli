import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  @Input()
  title = 'Top Header';

  constructor() { }

  ngOnInit() {
  }

}
