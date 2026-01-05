import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { BnFormField } from './bn-form.types';

@Injectable({
  providedIn: 'root',
})
export class BnFormService {
  constructor(private fb: FormBuilder) {}

  createFormGroup(fields: BnFormField[]): FormGroup {
    const group: any = {};

    fields.forEach((field) => {
      const validators = field.validators ?? [];
      if (field.required) {
        validators.push(Validators.required);
      }

      group[field.key] = new FormControl(
        { value: this.initialValue(field), disabled: field.disabled ?? false },
        validators,
      );
    });

    return this.fb.group(group);
  }

  initialValue(field: BnFormField) {
    if (field.initialValue != null) {
      return field.initialValue;
    }

    const defaultValues: Record<string, boolean | undefined | []> = {
      'switch': false,
      'triple-toggle': undefined,
      'select': [],
    };

    if (!field.type) {
      return '';
    }

    return field.type in defaultValues ? defaultValues[field.type] : '';
  }
}
