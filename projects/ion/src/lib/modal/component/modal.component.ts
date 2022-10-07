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
import { IonModalConfig } from '../models/modal.interface';
import { IonModalResponse } from '../models/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modalBody', { read: ViewContainerRef, static: true })
  modalBody: ViewContainerRef;

  @Input() config: IonModalConfig = {
    title: 'Ion Modal',
    showOverlay: true,
    overlayCanDismiss: true,

    footer: {
      hide: false,
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

  setConfig(newConfig: IonModalConfig) {
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
