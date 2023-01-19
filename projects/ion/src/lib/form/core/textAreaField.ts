import { FormField, IFormField } from './baseField';

export interface ITextField extends IFormField {
  label: string;
  placeholder: string;
  cols?: string;
  rows?: string;
}

export class TextAreaField extends FormField {
  label = '';
  placeholder: string;
  type = 'textarea';

  constructor({ placeholder, label, ...props }: ITextField) {
    super(
      props.disabled,
      props.show,
      props.size,
      props.required,
      props.validators
    );
    this.label = label;
    this.placeholder = placeholder;
  }
}
