import { Component, Input, OnInit } from '@angular/core';
import { TemplateHeader } from '../core/types/accordion';

@Component({
  selector: 'ion-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class IonAccordionComponent implements OnInit {
  @Input() name?: string;
  @Input() templateHeader?: TemplateHeader;
  @Input() show? = false;

  iconSize = 24;

  ngOnInit(): void {
    if (!this.name && !this.templateHeader) {
      throw new Error(
        'The name or templateHeader properties were not set correctly'
      );
    }
  }

  toggle(): void {
    this.show = !this.show;
  }
}
