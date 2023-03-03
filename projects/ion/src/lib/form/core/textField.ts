import { FormField, IFormField } from './baseField';

export interface ITextField extends IFormField {
  label: string;
  placeholder: string;
  icon?: string;
}

export class TextField extends FormField {
  label = '';
  placeholder: string;
  icon: string;
  type = 'text';

  constructor({ placeholder, icon, label, ...props }: ITextField) {
    super(
      props.disabled,
      props.show,
      props.size,
      props.required,
      props.validators
    );
    this.label = label;
    this.placeholder = placeholder;
    this.icon = icon;
  }
}
