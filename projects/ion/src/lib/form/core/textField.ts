import { FormField, IFormField } from './baseField';

export interface ITextField extends IFormField {
  label: string;
  required: boolean;
  placeholder: string;
  icon?: string;
}

export class TextField extends FormField {
  placeholder: string;
  icon: string;

  constructor({ placeholder, icon, ...props }: ITextField) {
    super(props.key, props.disabled, props.show, props.size);
    this.placeholder = placeholder;
    this.icon = icon;
  }
}
