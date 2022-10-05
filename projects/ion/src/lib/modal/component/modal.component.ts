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
  ionOnClose = new EventEmitter<unknown | boolean>();

  @HostListener('document:keydown.Escape', ['$event']) onKeydownHandler() {
    this.closeModal(false);
  }

  private componentFactory: ComponentRef<unknown>;
  private componentInputs: {
    propName: string;
    templateName: string;
  }[];

  constructor(private resolver: ComponentFactoryResolver) {}

  outsideClick() {
    this.closeModal(false);
  }

  setConfig(newConfig: IonModalProps) {
    if (newConfig) {
      Object.assign(this.config, newConfig);
    }
  }

  closeModal(emitValue?: unknown | boolean) {
    this.ionOnClose.emit(emitValue);
  }

  secondaryButtonClicked() {
    this.closeModal(false);
  }

  primaryButtonClicked() {
    this.closeModal(this.handleDynamicComponentDataToEmit());
  }

  handleDynamicComponentDataToEmit(): unknown {
    const data = {};
    this.componentInputs.forEach((input) => {
      data[input.propName] = this.componentFactory.instance[input.propName];
    });

    return data;
  }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);

    this.componentInputs = factory.inputs;
    this.componentFactory = this.modalBody.createComponent(factory);
  }
}
