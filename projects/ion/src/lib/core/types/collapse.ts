import { TemplateRef } from '@angular/core';

export type TemplateHeader = TemplateRef<HTMLElement> | null;

export interface IonCollapseProps {
  name?: string;
  templateHeader?: TemplateHeader;
  show?: boolean;
  color?: string;
}
