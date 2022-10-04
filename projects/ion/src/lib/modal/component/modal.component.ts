import { ButtonComponent } from './../../button/button.component';
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { out } from '../../icon/svgs/iconsText';
import { IonModalProps } from '../classes/modal.interface';

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
    canDismiss: true,
    showOverlay: true,
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
  ionOnClose = new EventEmitter<unknown>();

  @HostListener('document:keydown.Escape', ['$event']) onKeydownHandler() {
    this.closeModal(false);
  }

  constructor(private resolver: ComponentFactoryResolver) {}

  outsideClick() {
    this.closeModal(false);
  }

  setConfig(newConfig: IonModalProps) {
    if (newConfig) {
      Object.assign(this.config, newConfig);
    }
  }

  closeModal(emitValue?: unknown) {
    this.ionOnClose.emit(emitValue);
  }

  secondaryButtonClicked() {
    this.closeModal(false);
  }

  primaryButtonClicked() {
    this.closeModal(true);
  }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);
    this.modalBody.createComponent(factory);
  }
}
