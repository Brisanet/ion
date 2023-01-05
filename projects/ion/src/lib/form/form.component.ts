import { Component, Input, OnInit } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { Field } from './core/field';

export interface FormProps {
  fields: Field[];
  model: SafeAny;
}

@Component({
  selector: 'ion-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() config: FormProps;

  ngOnInit(): void {
    console.log('formConfig ->', this.config);
  }
}
