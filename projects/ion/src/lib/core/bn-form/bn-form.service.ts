import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
        { value: field.initialValue ?? '', disabled: field.disabled ?? false },
        validators
      );
    });

    return this.fb.group(group);
  }
}
