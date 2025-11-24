import {
  Component,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { AccordionItem, AccordionItemOutput } from '../core/types/accordion';

@Component({
  selector: 'ion-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
})
export class IonAccordionComponent implements OnInit {
  @Input() accordions: AccordionItem[] = [];
  @Input() templateBody: TemplateRef<HTMLElement>;
  @Input() modeAccordion = true;
  @Input() templateHeader: TemplateRef<HTMLElement>;
  @Output()
  activeChange = new EventEmitter<AccordionItemOutput>();

  ngOnInit(): void {
    this.validate();
  }

  toggle(index: number): void {
    const state: boolean = this.accordions[index].show;

    if (this.modeAccordion) {
      this.closeAccordions();
    }

    this.accordions[index] = {
      ...this.accordions[index],
      show: !state,
      key: index,
    };

    this.activeChange.emit(this.accordions[index]);
  }

  closeAccordions(): void {
    this.accordions.forEach((accordion) => (accordion.show = false));
  }

  validate(): void {
    if (!this.accordions.length) {
      throw new Error('The accordions property is not configured correctly');
    }

    if (!this.templateHeader) {
      throw new Error('The TemplateHeader propertie have not been set');
    }

    if (!this.templateBody) {
      throw new Error('The TempleteBody propertie have not been set');
    }
  }
}
