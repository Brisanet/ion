import {
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from './component/modal.component';
import { Subject } from 'rxjs';
import { IonModalProps } from './classes/modal.interface';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<unknown>;

  constructor(private resolver: ComponentFactoryResolver) {}

  open(
    containerRef: ViewContainerRef,
    // TODO: think in a better name
    modalBody: Type<unknown>,
    config?: IonModalProps
  ) {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = containerRef.createComponent(factory);

    if (config) {
      this.componentRef.instance.setConfig(config);
    }

    this.componentRef.instance.componentToBody = modalBody;
    this.componentRef.instance.ionOnClose.subscribe((valueFromModal) => {
      if (!valueFromModal) {
        this.closeModal();
        return;
      }

      this.confirm(valueFromModal);
    });
    this.componentSubscriber = new Subject<unknown>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(valueToEmit: unknown) {
    this.componentSubscriber.next(valueToEmit);
    this.closeModal();
  }
}
