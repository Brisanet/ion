import { BnFormField } from '../bn-form/bn-form.types';

export interface BnWizardStep {
  title: string;
  fields: BnFormField[];
}

export interface BnWizardConfig {
  title: string;
  steps: BnWizardStep[];
}
