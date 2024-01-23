import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { generateIDs } from '../utils';
import { SafeAny } from './../utils/safe-any';
import { IonModalComponent } from './component/modal.component';
import {
  IonModalConfiguration,
  IonModalResponse,
} from './models/modal.interface';

interface ModalComponentControl {
  ref: ComponentRef<IonModalComponent>;
  subscriber: Subject<IonModalResponse | unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  public readonly ionOnHeaderButtonAction = new Subject<SafeAny>();
  public modalsComponentControls: ModalComponentControl[] = [];

  private get modalComponentControl(): ModalComponentControl {
    return this.modalsComponentControls[
      this.modalsComponentControls.length - 1
    ];
  }

  private set modalComponentControl(ref: ModalComponentControl) {
    this.modalsComponentControls.push(ref);
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

    this.modalComponentControl = {
      ref: modal,
      subscriber: new Subject<IonModalResponse | unknown>(),
    };
    this.modalComponentControl.ref.instance.componentToBody = component;
    this.modalComponentControl.ref.instance.setDefaultConfig();
    if (configuration) {
      if (!configuration.id) {
        configuration.id = generateIDs('modal-', 'modal');
      }
      this.modalComponentControl.ref.instance.setConfig(configuration);
    }
    this.appRef.attachView(this.modalComponentControl.ref.hostView);
    this.modalComponentControl.ref.changeDetectorRef.detectChanges();

    const modalElement = this.modalComponentControl.ref.location.nativeElement;
    this.document.body.appendChild(modalElement);

    this.modalComponentControl.ref.instance.ionOnClose.subscribe(
      (valueFromModal: IonModalResponse) => {
        if (!valueFromModal) {
          this.closeModal();
          return;
        }

        this.emitValueAndCloseModal(valueFromModal);
      }
    );

    this.modalComponentControl.ref.instance.ionOnHeaderButtonAction.subscribe(
      (valueFromModal: IonModalResponse) => {
        this.emitHeaderAction(valueFromModal);
      }
    );

    return this.modalComponentControl.subscriber.asObservable();
  }

  emitValueAndCloseModal(valueToEmit: IonModalResponse | unknown): void {
    this.modalComponentControl.subscriber.next(valueToEmit);
    this.closeModal();
  }

  emitHeaderAction(valueToEmit: IonModalResponse | unknown): void {
    this.ionOnHeaderButtonAction.next(valueToEmit);
  }

  closeModal(id?: string): void {
    const modalComponentControl = id
      ? this.findModalComponentRefById(id)
      : this.modalComponentControl;

    if (modalComponentControl) {
      this.closeModalComponentRef(modalComponentControl);
    }
  }

  reconfigModal(configuration: IonModalConfiguration): void {
    this.modalComponentControl.ref.instance.setConfig({
      ...this.modalComponentControl.ref.instance.configuration,
      ...configuration,
    });
  }

  private findModalComponentRefById(
    id: string
  ): ModalComponentControl | undefined {
    return this.modalsComponentControls.find(
      (modal) => modal.ref.instance.configuration.id === id
    );
  }

  private closeModalComponentRef(
    modalComponentControl: ModalComponentControl
  ): void {
    this.appRef.detachView(modalComponentControl.ref.hostView);
    modalComponentControl.subscriber.complete();
    modalComponentControl.ref.destroy();

    this.modalsComponentControls = this.modalsComponentControls.filter(
      (modal) =>
        modal.ref.instance.configuration.id !==
        modalComponentControl.ref.instance.configuration.id
    );
  }
}
