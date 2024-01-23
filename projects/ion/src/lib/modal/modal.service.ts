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
import { SafeAny } from './../utils/safe-any';

import { IonModalComponent } from './component/modal.component';
import {
  IonModalConfiguration,
  IonModalResponse,
} from './models/modal.interface';
import { generateIDs } from '../utils';

interface ModalComponentRef {
  ref: ComponentRef<IonModalComponent>;
  subscriber: Subject<IonModalResponse | unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  public readonly ionOnHeaderButtonAction = new Subject<SafeAny>();
  private modalsComponentRefs: ModalComponentRef[] = [];

  private get modalComponentRef(): ModalComponentRef {
    return this.modalsComponentRefs[this.modalsComponentRefs.length - 1];
  }

  private set modalComponentRef(ref: ModalComponentRef) {
    this.modalsComponentRefs.push(ref);
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

    this.modalComponentRef = {
      ref: modal,
      subscriber: new Subject<IonModalResponse | unknown>(),
    };
    this.modalComponentRef.ref.instance.componentToBody = component;
    this.modalComponentRef.ref.instance.setDefaultConfig();
    if (configuration) {
      if (!configuration.id) {
        configuration.id = generateIDs('modal-', 'modal');
      }
      this.modalComponentRef.ref.instance.setConfig(configuration);
    }
    this.appRef.attachView(this.modalComponentRef.ref.hostView);
    this.modalComponentRef.ref.changeDetectorRef.detectChanges();

    const modalElement = this.modalComponentRef.ref.location.nativeElement;
    this.document.body.appendChild(modalElement);

    this.modalComponentRef.ref.instance.ionOnClose.subscribe(
      (valueFromModal: IonModalResponse) => {
        if (!valueFromModal) {
          this.closeModal();
          return;
        }

        this.emitValueAndCloseModal(valueFromModal);
      }
    );

    this.modalComponentRef.ref.instance.ionOnHeaderButtonAction.subscribe(
      (valueFromModal: IonModalResponse) => {
        this.emitHeaderAction(valueFromModal);
      }
    );

    return this.modalComponentRef.subscriber.asObservable();
  }

  emitValueAndCloseModal(valueToEmit: IonModalResponse | unknown): void {
    this.modalComponentRef.subscriber.next(valueToEmit);
    this.closeModal();
  }

  emitHeaderAction(valueToEmit: IonModalResponse | unknown): void {
    this.ionOnHeaderButtonAction.next(valueToEmit);
  }

  closeModal(id?: string): void {
    const modalComponentRef = id
      ? this.findModalComponentRefById(id)
      : this.modalComponentRef;

    if (modalComponentRef) {
      this.closeModalComponentRef(modalComponentRef);
    }
  }

  reconfigModal(configuration: IonModalConfiguration): void {
    this.modalComponentRef.ref.instance.setConfig({
      ...this.modalComponentRef.ref.instance.configuration,
      ...configuration,
    });
  }

  private findModalComponentRefById(id: string): ModalComponentRef | undefined {
    return this.modalsComponentRefs.find(
      (modal) => modal.ref.instance.configuration.id === id
    );
  }

  private closeModalComponentRef(modalComponentRef: ModalComponentRef): void {
    this.appRef.detachView(modalComponentRef.ref.hostView);
    modalComponentRef.subscriber.complete();
    modalComponentRef.ref.destroy();

    this.modalsComponentRefs = this.modalsComponentRefs.filter(
      (modal) =>
        modal.ref.instance.configuration.id !==
        modalComponentRef.ref.instance.configuration.id
    );
  }
}
