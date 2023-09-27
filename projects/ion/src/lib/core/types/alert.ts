import { TemplateRef } from '@angular/core';
import { StatusType } from './status';

export interface IonAlertProps {
  message: string | TemplateRef<void>;
  description?: string;
  type?: StatusType;
  closable?: boolean;
  hideBackground?: boolean;
  noRadius?: boolean;
}
