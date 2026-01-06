import { BnFormField } from '../bn-form/bn-form.types';
import { StatusType } from '../../core/types';
import { IconType } from '../../core/types/icon';
import { Observable } from 'rxjs';

export interface BnWizardStep {
  title: string;
  fields: BnFormField[];
  alert?: {
    message: string;
    type: StatusType;
  };
}

export interface BnWizardConfig {
  title: string;
  titleIcon?: IconType;
  steps: BnWizardStep[];
  horizontal?: boolean;
  isLoading?: boolean;
  onSubmit?: (data: any) => Observable<any> | Promise<any>;
}
