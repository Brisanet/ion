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
  // if you generate your field this way, you can access the methods directly (and change properties)
  fieldName = new TextField({
    key: 'name',
    label: 'Nome',
    required: true,
    placeholder: 'Insira seu nome...',
    icon: 'user',
  });

  public formConfig: FormField<SafeAny>[] = [
    this.fieldName,
    // generating this way, you'll not be able to change properties
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
    }, 2500);
    setTimeout(() => {
      this.fieldName.setDisabled(true);
    }, 5000);
    setTimeout(() => {
      this.fieldName.setDisabled(false);
    }, 7000);
  }
}
