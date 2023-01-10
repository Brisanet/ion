import { AfterViewInit, Component } from '@angular/core';
import { SafeAny } from 'ion/lib/utils/safe-any';
import { FormField } from '../core/baseField';
import { TextField } from '../core/textField';

@Component({
  selector: 'form-story',
  template: `
    <div>
      <ion-form [config]="formConfig" [model]="model"></ion-form>
    </div>
  `,
})
export class FormStoryComponent implements AfterViewInit {
  public formConfig: FormField<SafeAny>[] = [
    new TextField({
      key: 'name',
      label: 'Nome',
      required: true,
      placeholder: 'Insira seu nome...',
      icon: 'user',
    }),
    new TextField({
      key: 'email',
      label: 'E-mail',
      required: true,
      placeholder: 'Insira seu e-mail',
      icon: 'pencil',
    }),
  ];

  public model = {};

  ngAfterViewInit(): void {
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
