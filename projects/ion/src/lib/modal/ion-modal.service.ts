import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IonModalProps } from './classes/modal.interface';
import { ModalComponent } from './component/modal.component';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<unknown>;

  constructor(private resolver: ComponentFactoryResolver) {}

  open(
    containerRef: ViewContainerRef,
    modalBody: Type<unknown>,
    config?: IonModalProps
  ) {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = containerRef.createComponent(factory);

    if (config) {
      this.componentRef.instance.setConfig(config);
    }

    this.componentRef.instance.componentToBody = modalBody;
    this.componentRef.instance.ionOnClose.subscribe(
      (valueFromModal: unknown) => {
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

  emitValueAndCloseModal(valueToEmit: unknown) {
    this.componentSubscriber.next(valueToEmit);
    this.closeModal();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}
