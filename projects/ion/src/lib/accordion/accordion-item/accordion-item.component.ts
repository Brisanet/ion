import { Component, TemplateRef, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../../icon/icon.component';
import { SafeAny } from '../../utils/safe-any';

@Component({
  selector: 'ion-accordion-item',
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class IonAccordionItemComponent {
  templateHeader = input.required<TemplateRef<SafeAny>>();
  show = input<boolean>(false);
  data = input<SafeAny>();
  activeChange = output<void>();

  iconSize = 24;

  toggle(): void {
    this.activeChange.emit();
  }
}
