import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField } from './core/baseField';

export interface FormComponentProps {
  fields: FormField[];
  formGroup?: FormGroup;
}

@Component({
  selector: 'ion-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() fields: FormField[];
  @Input() formGroup = new FormGroup({});

  createForm(): void {
    this.fields.forEach((field) => {
      this.formGroup.addControl(
        field.getKey(),
        new FormControl(
          { value: '', disabled: field.getDisabled() },
          field.getValidators()
        )
      );
      field.setFormControl(this.formGroup.controls[field.getKey()]);
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
}
