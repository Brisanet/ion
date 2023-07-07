import { TemplateRef } from '@angular/core';
import { StatusType } from './status';

export interface IonAlertProps {
  message: string | TemplateRef<void>;
  type?: StatusType;
  closable?: boolean;
  hideBackground?: boolean;
}
