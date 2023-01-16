import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormField } from '../core/baseField';
import { TextField } from '../core/textField';

@Component({
  selector: 'form-story',
  template: `
    <div>
      <ion-form [formGroup]="formGroup" [config]="formConfig"></ion-form>
    </div>
  `,
})
export class FormStoryComponent implements AfterViewInit {
  formGroup = new FormGroup({});

  // if you generate your field this way, you can access the methods directly (and change properties)
  fieldName = new TextField({
    key: 'name',
    label: 'Nome',
    required: true,
    placeholder: 'Insira seu nome...',
    validators: [Validators.minLength(3)],
  });

  public formConfig: FormField[] = [
    this.fieldName,
    // generating this way, you'll not be able to change properties
    new TextField({
      key: 'email',
      label: 'E-mail',
      required: false,
      placeholder: 'Insira seu e-mail',
      icon: 'pencil',
      validators: [Validators.email],
    }),
  ];

  public model = {};

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fieldName.setDisable(true);
    }, 3000);
    setTimeout(() => {
      this.formGroup.controls.name.enable();
    }, 5000);
  }
}
