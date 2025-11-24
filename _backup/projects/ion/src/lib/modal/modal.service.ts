import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { SafeAny } from './../utils/safe-any';
import { IonModalComponent } from './component/modal.component';
import {
  IonModalConfiguration,
  IonModalResponse,
  ModalControl,
} from './models/modal.interface';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  public readonly ionOnHeaderButtonAction = new Subject<SafeAny>();
  public modalsControls: ModalControl[] = [];

  private get currentModalControl(): ModalControl {
    return this.modalsControls[this.modalsControls.length - 1];
  }

  private set currentModalControl(control: ModalControl) {
    this.modalsControls.push(control);
  }

  constructor(
    // TODO: SafeAny used due to an issue in Angular 8 (https://github.com/angular/angular/issues/20351). When projects are updated to v9, change "SafeAny" to "Document";
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(
    component: Type<unknown>,
    configuration?: IonModalConfiguration
  ): Observable<IonModalResponse | unknown> {
    const modal = this.componentFactoryResolver
      .resolveComponentFactory(IonModalComponent)
      .create(this.injector);

    this.currentModalControl = {
      ref: modal,
      subscriber: new Subject<IonModalResponse | unknown>(),
    };
    this.currentModalControl.ref.instance.componentToBody = component;
    this.currentModalControl.ref.instance.setDefaultConfig();
    if (configuration) {
      this.currentModalControl.ref.instance.setConfig(configuration);
    }
    this.appRef.attachView(this.currentModalControl.ref.hostView);
    this.currentModalControl.ref.changeDetectorRef.detectChanges();

    const modalElement = this.currentModalControl.ref.location.nativeElement;
    this.document.body.appendChild(modalElement);

    this.currentModalControl.ref.instance.ionOnClose.subscribe(
      (valueFromModal: IonModalResponse) => {
        if (!valueFromModal) {
          this.closeModal();
          return;
        }

        if (
          this.currentModalControl.ref.instance.configuration
            .preventCloseOnConfirm
        ) {
          this.emitValue(valueFromModal);
          return;
        }

        this.emitValueAndCloseModal(valueFromModal);
      }
    );

    this.currentModalControl.ref.instance.ionOnHeaderButtonAction.subscribe(
      (valueFromModal: IonModalResponse) => {
        this.emitHeaderAction(valueFromModal);
      }
    );

    return this.currentModalControl.subscriber.asObservable();
  }

  emitValue(valueToEmit: IonModalResponse | unknown): void {
    this.currentModalControl.subscriber.next(valueToEmit);
  }

  emitValueAndCloseModal(valueToEmit: IonModalResponse | unknown): void {
    this.currentModalControl.subscriber.next(valueToEmit);
    this.closeModal();
  }

  emitHeaderAction(valueToEmit: IonModalResponse | unknown): void {
    this.ionOnHeaderButtonAction.next(valueToEmit);
  }

  closeModal(id?: string): void {
    const modalComponentControl = id
      ? this.findModalControlById(id)
      : this.currentModalControl;

    if (modalComponentControl) {
      this.destroyModalControl(modalComponentControl);
    }
  }

  reconfigModal(configuration: IonModalConfiguration): void {
    this.currentModalControl.ref.instance.setConfig({
      ...this.currentModalControl.ref.instance.configuration,
      ...configuration,
    });
  }

  public findModalControlById(id: string): ModalControl | undefined {
    return this.modalsControls.find(
      (modal) => modal.ref.instance.configuration.id === id
    );
  }

  private destroyModalControl(modalControl: ModalControl): void {
    this.appRef.detachView(modalControl.ref.hostView);
    modalControl.subscriber.complete();
    modalControl.ref.destroy();

    this.modalsControls = this.modalsControls.filter(
      (modal) =>
        modal.ref.instance.configuration.id !==
        modalControl.ref.instance.configuration.id
    );
  }
}
