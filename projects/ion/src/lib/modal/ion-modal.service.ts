import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IonModalComponent } from './component/modal.component';
import {
  IonModalConfiguration,
  IonModalResponse,
} from './models/modal.interface';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private modalComponentRef!: ComponentRef<IonModalComponent>;
  private componentSubscriber!: Subject<unknown>;

  constructor(private resolver: ComponentFactoryResolver) {}

  open(
    viewContainerRef: ViewContainerRef,
    component: Type<unknown>,
    configuration?: IonModalConfiguration
  ): Observable<unknown> {
    const factory = this.resolver.resolveComponentFactory(IonModalComponent);
    this.modalComponentRef = viewContainerRef.createComponent(factory);
    this.modalComponentRef.instance.setDefaultConfig();
    this.modalComponentRef.instance.componentToBody = component;

    if (configuration) {
      this.modalComponentRef.instance.setConfig(configuration);
    }

    this.modalComponentRef.instance.ionOnClose.subscribe(
      (valueFromModal: IonModalResponse) => {
        if (!valueFromModal) {
          this.closeModal();
          return;
        }

        this.emitValueAndCloseModal(valueFromModal);
      }
    );
    this.componentSubscriber = new Subject<unknown>();
    return this.componentSubscriber.asObservable();
  }

  emitValueAndCloseModal(valueToEmit: IonModalResponse) {
    this.componentSubscriber.next(valueToEmit);
    this.closeModal();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.modalComponentRef.destroy();
  }
}
