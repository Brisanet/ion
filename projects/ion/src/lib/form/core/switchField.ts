import { FormField, IFormField } from './baseField';

export interface ISwitchField extends IFormField {
  label: string;
}

export class SwitchField extends FormField {
  label = '';
  type = 'switch';

  constructor({ label, ...props }: ISwitchField) {
    super(
      props.disabled,
      props.show,
      props.size,
      props.required,
      props.validators
    );
    this.label = label;
  }
}
