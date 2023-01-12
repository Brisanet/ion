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

  public formGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  createForm(): void {
    this.config.forEach((field) => {
      this.formGroup.addControl(
        field.key,
        this.fb.control({ value: '', disabled: field.disabled })
      );
      field.setFormControl(this.formGroup.controls[field.key]);
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
}
