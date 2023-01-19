import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SwitchField } from '../core/switchField';
import { TextAreaField } from '../core/textAreaField';
import { TextField } from '../core/textField';

@Component({
  selector: 'form-story',
  template: `
    <div>
      <ion-form [formGroup]="formGroup" [fields]="formConfig"></ion-form>
      <button (click)="consoleModel()">Consolar model</button>
    </div>
  `,
})
export class FormStoryComponent implements AfterViewInit {
  formGroup = new FormGroup({});

  // if you generate your field this way, you can access the methods directly (and change properties)
  fieldName = new TextField({
    label: 'Nome',
    required: true,
    placeholder: 'Insira seu nome...',
    validators: [Validators.minLength(3)],
  });

  description = new TextAreaField({
    label: 'Descrição',
    placeholder: 'Escreva algo...',
  });

  public formConfig = {
    name: this.fieldName,
    description: this.description,
    // generating this way, you'll not be able to change properties
    email: new TextField({
      label: 'E-mail',
      required: false,
      placeholder: 'Insira seu e-mail',
      icon: 'pencil',
      validators: [Validators.email],
    }),
    desabilitar: new SwitchField({
      label: 'Desabilitar:',
    }),
  };

  consoleModel(): void {
    console.log(this.formGroup.value);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formConfig.name.setDisable(true);
    }, 3000);
    setTimeout(() => {
      this.formGroup.controls.name.enable();
      this.formGroup.controls.name.setValue('renaissance');
    }, 5000);
  }
}
