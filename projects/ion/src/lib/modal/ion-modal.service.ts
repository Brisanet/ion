import {
  ComponentFactoryResolver,
  ComponentRef,
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
  private componentSubscriber!: Subject<string>;

  constructor(private resolver: ComponentFactoryResolver) {}

  open(
    containerRef: ViewContainerRef,
    config?: IonModalProps,
    modalBody?: Type<unknown>
  ) {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = containerRef.createComponent(factory);
    this.componentRef.instance.config = config;
    this.componentRef.instance.ionOnClose.subscribe((valueFromModal) =>
      this.closeModal()
    );
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}
