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

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  public readonly ionOnHeaderButtonAction = new Subject<SafeAny>();
  private modalComponentRef!: ComponentRef<IonModalComponent>;
  private componentSubscriber!: Subject<IonModalResponse | unknown>;

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

    this.modalComponentRef = modal;
    this.modalComponentRef.instance.componentToBody = component;
    this.modalComponentRef.instance.setDefaultConfig();
    if (configuration) {
      this.modalComponentRef.instance.setConfig(configuration);
    }
    this.appRef.attachView(this.modalComponentRef.hostView);
    this.modalComponentRef.changeDetectorRef.detectChanges();

    const modalElement = this.modalComponentRef.location.nativeElement;
    this.document.body.appendChild(modalElement);

    this.modalComponentRef.instance.ionOnClose.subscribe(
      (valueFromModal: IonModalResponse) => {
        if (!valueFromModal) {
          this.closeModal();
          return;
        }

        this.emitValueAndCloseModal(valueFromModal);
      }
    );

    this.modalComponentRef.instance.ionOnHeaderButtonAction.subscribe(
      (valueFromModal: IonModalResponse) => {
        this.emitHeaderAction(valueFromModal);
      }
    );

    this.componentSubscriber = new Subject<IonModalResponse | unknown>();
    return this.componentSubscriber.asObservable();
  }

  emitValueAndCloseModal(valueToEmit: IonModalResponse | unknown): void {
    this.componentSubscriber.next(valueToEmit);
    this.closeModal();
  }

  emitHeaderAction(valueToEmit: IonModalResponse | unknown): void {
    this.ionOnHeaderButtonAction.next(valueToEmit);
  }

  closeModal(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.componentSubscriber.complete();
      this.modalComponentRef.destroy();
    }
  }

  reconfigModal(configuration: IonModalConfiguration): void {
    this.modalComponentRef.instance.setConfig({
      ...this.modalComponentRef.instance.configuration,
      ...configuration,
    });
  }
}
