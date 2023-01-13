import { FormField, IFormField } from './baseField';

export interface ITextField extends IFormField {
  label: string;
  required: boolean;
  placeholder: string;
  icon?: string;
}

export class TextField extends FormField {
  label = '';
  placeholder: string;
  icon: string;
  type = 'text';

  constructor({ placeholder, icon, label, ...props }: ITextField) {
    super(props.key, props.disabled, props.show, props.size);
    this.label = label;
    this.placeholder = placeholder;
    this.icon = icon;
  }
}
