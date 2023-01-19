import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export interface IFormField {
  disabled?: boolean;
  show?: boolean;
  size?: number;
  required?: boolean;
  validators?: ValidatorFn[];
}

export abstract class FormField {
  show: boolean;
  size: number;
  type: string;
  required: boolean;
  private _key: string;
  private formControl: AbstractControl;

  constructor(
    private readonly disabled = false,
    show = true,
    size = 4,
    required = false,
    private readonly validators = []
  ) {
    this.show = show;
    this.size = size;
    this.required = required;
  }

  setFormControl(control: AbstractControl): void {
    this.formControl = control;
  }

  setDisable(value: boolean): void {
    value && this.formControl
      ? this.formControl.disable()
      : this.formControl.enable();
    this.formControl.updateValueAndValidity();
  }

  set key(key: string) {
    this._key = key;
  }

  get key(): string {
    return this._key;
  }

  getKey(): string {
    return this.key;
  }

  getDisabled(): boolean {
    return this.disabled;
  }

  getValidators(): ValidatorFn[] {
    if (this.required) {
      this.validators.push(Validators.required);
    }
    return this.validators;
  }
}
