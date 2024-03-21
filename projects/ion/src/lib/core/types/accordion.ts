import { SafeAny } from '../../utils/safe-any';
import { TemplateRef, EventEmitter } from '@angular/core';

export type AccordionItem<T = SafeAny> = T;

export type AccordionItemOutput<T = SafeAny> = T & {
  key: number;
  show: boolean;
};

export interface IonAccordionItemProps {
  templateHeader: TemplateRef<HTMLElement>;
  data?: Record<string, SafeAny>;
  show?: boolean;
  activeChange?: EventEmitter<void>;
}

export interface IonAccordionProps {
  accordions: AccordionItem[];
  templateHeader: TemplateRef<HTMLElement>;
  templateAccordionBody: TemplateRef<HTMLElement>;
  modeAccordion?: boolean;
  activeChange?: EventEmitter<AccordionItemOutput>;
}
