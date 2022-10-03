import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IonModalProps } from '../classes/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalBody', { static: false }) modalBody: ViewContainerRef;
  @Input() componentToBody: Type<unknown>;
  @Input() config: IonModalProps;
  @Output()
  ionOnClose = new EventEmitter<unknown | undefined>();

  constructor(private resolver: ComponentFactoryResolver) {}

  outsideClick() {
    if (this.config.canDismiss) {
      this.closeModal();
    }
  }

  closeModal(emitValue?: unknown | undefined) {
    this.ionOnClose.emit(emitValue);
  }

  secondaryButtonClicked() {
    this.closeModal(false);
  }

  primaryButtonClicked() {
    this.closeModal(true);
  }

  ngAfterViewInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);
    this.modalBody.createComponent(factory);
  }
}
