export interface ITextField extends Field {
  label: string;
  requerid: boolean;
  placeholder: string;
  icon?: string;
}

export interface Field {
  key: string;
  label?: string;
}

export class FormField {
  private show: boolean;
  private disabled: boolean;
  private size: number;

  constructor(readonly key: string, disabled = false, show = true, size = 4) {
    this.show = show;
    this.disabled = disabled;
    this.size = size;
  }

  public createComponent(): void {}

  public isValid(): boolean {
    return true;
  }

  public isShowing(): boolean {
    return this.show;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }
}

export class TextField extends FormField {
  constructor(props: ITextField) {
    super(props.key);
  }

  public getKey(): string {
    return this.key;
  }
}
