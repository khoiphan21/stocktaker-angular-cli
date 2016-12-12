import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.css']
})
export class SectionHeadingComponent implements OnInit {
  @Input()
  title = 'Section Heading Title';

  constructor() { }

  ngOnInit() {
  }

}
