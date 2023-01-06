import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../form/core/baseField';
import { TextField } from '../form/core/textField';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() label?: string;
  @Input() checked? = false;
  @Input() disabled? = false;

  formConfig: FormField<SafeAny>[] = [];

  public model = {};

  check(): void {
    this.checked = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.formConfig = [
        ...this.formConfig,
        new TextField({
          key: 'teste',
          label: 'Aceite os termos',
          required: true,
          placeholder: 'Aceite os termos',
          icon: 'pencil',
          disabled: true,
        }),
      ];
    }, 5000);
  }
}
