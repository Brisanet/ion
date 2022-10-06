import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IonModalProps, IonModalResponse } from './classes/modal.interface';
import { ModalComponent } from './component/modal.component';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private modalComponentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<unknown>;

  constructor(private resolver: ComponentFactoryResolver) {}

  open(
    containerRef: ViewContainerRef,
    modalBody: Type<unknown>,
    config?: IonModalProps
  ) {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.modalComponentRef = containerRef.createComponent(factory);

    if (config) {
      this.modalComponentRef.instance.setConfig(config);
    }

    this.modalComponentRef.instance.componentToBody = modalBody;
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
