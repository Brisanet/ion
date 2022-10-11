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
import { IonModalConfiguration } from '../models/modal.interface';
import { IonModalResponse } from '../models/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class IonModalComponent implements OnInit {
  @ViewChild('modalBody', { read: ViewContainerRef, static: true })
  modalBody: ViewContainerRef;

  @Input() config: IonModalConfiguration;
  @Input() componentToBody: Type<unknown>;

  @Output()
  ionOnClose = new EventEmitter<IonModalResponse | undefined>();

  @HostListener('document:keydown.Escape', ['$event']) closeOnEscapeKeyDown() {
    this.closeModal();
  }

  private componentFactory: ComponentRef<unknown>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.setDefaultConfig();
  }

  setConfig(config: IonModalConfiguration): void {
    if (config) {
      Object.assign(this.config, config);
    }
  }

  getChildComponentPropertiesValue(): IonModalResponse {
    return this.componentFactory.instance as { [key: string]: unknown };
  }

  closeModal(valueToEmit?: IonModalResponse | undefined) {
    this.ionOnClose.emit(valueToEmit);
  }

  private setDefaultConfig(): void {
    this.config = {
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
  }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);
    this.componentFactory = this.modalBody.createComponent(factory);
  }
}
