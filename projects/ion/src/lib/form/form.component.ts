import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormField } from './core/baseField';

@Component({
  selector: 'ion-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() config: FormField[];
  @Input() formGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  createForm(): void {
    this.config.forEach((field) => {
      this.formGroup.addControl(
        field.getKey(),
        this.fb.control(
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
