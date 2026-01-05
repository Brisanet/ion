import { BnFormField } from '../bn-form/bn-form.types';
import { StatusType } from '../../core/types';

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
  steps: BnWizardStep[];
}
