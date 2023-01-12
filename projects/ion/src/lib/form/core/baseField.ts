import { AbstractControl } from '@angular/forms';

export interface IFormField {
  key: string;
  disabled?: boolean;
  show?: boolean;
  size?: number;
}

export abstract class FormField {
  show: boolean;
  disabled: boolean;
  size: number;

  formControl: AbstractControl;

  constructor(readonly key: string, disabled = false, show = true, size = 4) {
    this.show = show;
    this.disabled = disabled;
    this.size = size;
  }

  getKey(): string {
    return this.key;
  }

  setFormControl(control: AbstractControl): void {
    this.formControl = control;
  }

  setDisable(value: boolean): void {
    value && this.formControl
      ? this.formControl.disable()
      : this.formControl.enable();
  }
}
