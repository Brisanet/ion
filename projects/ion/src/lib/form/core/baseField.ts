import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
} from '@angular/core';
import { SafeAny } from '../../utils/safe-any';

export interface IFormField {
  key: string;
  disabled?: boolean;
  show?: boolean;
  size?: number;
}

export abstract class FormField<T> {
  public componentRef: ComponentRef<T> = null;

  show: boolean;
  disabled: boolean;
  size: number;
  value: SafeAny;
  valueChange: EventEmitter<SafeAny>;

  constructor(readonly key: string, disabled = false, show = true, size = 4) {
    this.show = show;
    this.disabled = disabled;
    this.size = size;
  }

  getComponentRef(): ComponentRef<T> {
    return this.componentRef;
  }

  createComponent(
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef
  ): HTMLElement {
    this.componentRef = this.getComponentFactory(
      componentFactoryResolver
    ).create(injector);

    appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<SafeAny>)
      .rootNodes[0];
  }

  abstract setComponentProperties(): void;
  abstract getComponentFactory(
    componentFactoryResolver: ComponentFactoryResolver
  ): ComponentFactory<T>;

  generateComponent(
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef
  ): HTMLElement {
    const component = this.createComponent(
      componentFactoryResolver,
      injector,
      appRef
    );
    this.setComponentProperties();
    return component;
  }

  public isValid(): boolean {
    return true;
  }

  public isShowing(): boolean {
    return this.show;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public getValue(): SafeAny {
    return this.value;
  }

  public onValueChange(): EventEmitter<SafeAny> {
    return this.valueChange;
  }
}
