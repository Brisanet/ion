import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import {
  IonModalConfiguration,
  IonModalResponse,
} from '../models/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class IonModalComponent implements OnInit {
  @ViewChild('modalBody', { read: ViewContainerRef, static: true })
  modalBody: ViewContainerRef;
  @ViewChild('dialogElement', { static: true })
  dialogElement: ElementRef;

  @Input() componentToBody: Type<unknown>;
  @Input() configuration: IonModalConfiguration = {};

  @Output()
  ionOnClose = new EventEmitter<IonModalResponse | undefined>();

  private componentFactory: ComponentRef<unknown>;
  private _defaultModal: IonModalConfiguration = {
    title: 'Ion Modal',
    showOverlay: true,
    overlayCanDismiss: true,

    footer: {
      hide: false,
      showDivider: true,
      primaryButton: {
        label: 'Confirmar',
      },
      secondaryButton: {
        label: 'Cancelar',
      },
    },
  };

  constructor(private resolver: ComponentFactoryResolver) {}

  @HostListener('document:keydown.Escape') closeOnEscapeKeyDown(): void {
    this.closeModal();
  }

  setConfig(config: IonModalConfiguration): void {
    if (config) {
      Object.assign(this.configuration, config);
    }
  }

  setDefaultConfig(): void {
    this.configuration = this._defaultModal;
  }

  getChildComponentPropertiesValue(): IonModalResponse {
    return this.componentFactory.instance as { [key: string]: unknown };
  }

  closeModal(valueToEmit?: IonModalResponse | undefined): void {
    this.ionOnClose.emit(valueToEmit);
  }

  ngOnInit(): void {
    this.setDefaultConfig();
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);
    this.componentFactory = this.modalBody.createComponent(factory);
    this.dialogElement.nativeElement.focus();
  }
}
