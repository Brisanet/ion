import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField } from './core/baseField';

export interface FormComponentProps {
  fields: { [key: string]: FormField };
  formGroup?: FormGroup;
}

@Component({
  selector: 'ion-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() fields: { [key: string]: FormField };
  @Input() formGroup = new FormGroup({});

  public formFields: FormField[];

  createForm(): void {
    this.formFields = Object.values(this.fields);
    this.formFields.forEach((field, index) => {
      field.key = Object.keys(this.fields)[index];
      this.formGroup.addControl(
        field.key,
        new FormControl(
          { value: '', disabled: field.getDisabled() },
          field.getValidators()
        )
      );
      field.setFormControl(this.formGroup.controls[field.key]);
      console.log(this.formGroup.controls.name);
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
}
