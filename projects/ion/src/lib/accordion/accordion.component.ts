import { Component, TemplateRef, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItem, AccordionItemOutput } from '../core/types/accordion';
import { IonAccordionItemComponent } from './accordion-item/accordion-item.component';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-accordion',
  standalone: true,
  imports: [CommonModule, IonAccordionItemComponent],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class IonAccordionComponent {
  accordions = input<AccordionItem[]>([]);
  templateBody = input<TemplateRef<SafeAny>>();
  modeAccordion = input<boolean>(true);
  templateHeader = input.required<TemplateRef<SafeAny>>();
  activeChange = output<AccordionItemOutput>();

  toggle(index: number): void {
    const currentAccordions = this.accordions();
    const state: boolean = currentAccordions[index].show;

    if (this.modeAccordion()) {
      this.closeAccordions(currentAccordions);
    }

    currentAccordions[index] = {
      ...currentAccordions[index],
      show: !state,
      key: index,
    };

    this.activeChange.emit(currentAccordions[index]);
  }

  closeAccordions(accordions: AccordionItem[]): void {
    accordions.forEach((accordion) => (accordion.show = false));
  }
}
