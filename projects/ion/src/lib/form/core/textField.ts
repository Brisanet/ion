import { ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { FormField, IFormField } from './baseField';

export interface ITextField extends IFormField {
  label: string;
  required: boolean;
  placeholder: string;
  icon?: string;
}

export class TextField extends FormField<InputComponent> {
  placeholder: string;
  icon: string;
  value = '';

  constructor({ placeholder, icon, ...props }: ITextField) {
    super(props.key, props.disabled, props.show, props.size);
    this.placeholder = placeholder;
    this.icon = icon;
  }

  public getKey(): string {
    return this.key;
  }

  getComponentFactory(
    componentFactoryResolver: ComponentFactoryResolver
  ): ComponentFactory<InputComponent> {
    return componentFactoryResolver.resolveComponentFactory(InputComponent);
  }

  setComponentProperties(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.inputType = 'text';
      this.componentRef.instance.iconInput = this.icon;
      this.componentRef.instance.placeholder = this.placeholder;
      this.componentRef.instance.disabled = this.isDisabled();
      if (this.value) {
        this.componentRef.instance.value = this.value;
      }
      this.componentRef.instance.valueChange.subscribe((value) => {
        this.value = value;
      });
    }
  }
}
