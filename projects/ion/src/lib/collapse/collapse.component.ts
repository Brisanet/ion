import { Component, Input } from '@angular/core';
import { TemplateHeader } from '../core/types/collapse';

@Component({
  selector: 'ion-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class IonCollapseComponent {
  @Input() name?: string;
  @Input() templateHeader: TemplateHeader;
  @Input() show? = false;
  @Input() color?: string;

  toggle(): void {
    this.show = !this.show;
  }
}
