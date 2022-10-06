import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IonModalProps } from '../classes/modal.interface';
import { IonModalResponse } from './../classes/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modalBody', { read: ViewContainerRef, static: true })
  modalBody: ViewContainerRef;

  @Input() config: IonModalProps = {
    title: 'Ion Modal',
    showOverlay: true,
    overlayCanDismiss: true,

    footer: {
      showDivider: true,
      primaryButton: {
        label: 'Confirm',
      },
      secondaryButton: {
        label: 'Cancel',
      },
    },
  };
  @Input() componentToBody: Type<unknown>;
  @Output()
  ionOnClose = new EventEmitter<IonModalResponse>();

  @HostListener('document:keydown.Escape', ['$event']) onKeydownHandler() {
    this.closeModal();
  }

  private componentFactory: ComponentRef<unknown>;

  constructor(private resolver: ComponentFactoryResolver) {}

  outsideClick() {
    this.closeModal();
  }

  setConfig(newConfig: IonModalProps) {
    if (newConfig) {
      Object.assign(this.config, newConfig);
    }
  }

  primaryButtonClicked() {
    this.closeModal(this.handleDynamicComponentDataToEmit());
  }

  secondaryButtonClicked() {
    this.closeModal();
  }

  handleDynamicComponentDataToEmit(): IonModalResponse {
    return this.componentFactory.instance as { [key: string]: unknown };
  }

  closeModal(valueToEmit?: IonModalResponse) {
    this.ionOnClose.emit(valueToEmit);
  }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);
    this.componentFactory = this.modalBody.createComponent(factory);
  }
}
