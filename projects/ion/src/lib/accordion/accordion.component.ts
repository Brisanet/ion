import { Component, Input } from '@angular/core';
import { TemplateHeader } from '../core/types/accordion';

@Component({
  selector: 'ion-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class IonAccordionComponent {
  @Input() name?: string;
  @Input() templateHeader?: TemplateHeader;
  @Input() show? = false;

  iconSize = 24;

  toggle(): void {
    this.show = !this.show;
  }
}
