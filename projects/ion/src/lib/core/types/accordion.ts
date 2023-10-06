import { TemplateRef } from '@angular/core';

export type TemplateHeader = TemplateRef<HTMLElement> | null;

export interface IonAccordionProps {
  name?: string;
  templateHeader?: TemplateHeader;
  show?: boolean;
}
