import {
  AfterViewInit,
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

import { generateIDs } from '../../utils';
import {
  IonModalConfiguration,
  IonModalResponse,
} from '../models/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class IonModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalBody', { read: ViewContainerRef, static: true })
  modalBody: ViewContainerRef;
  @ViewChild('dialogElement', { static: true })
  dialogElement: ElementRef<HTMLDialogElement>;

  @Input() componentToBody: Type<unknown>;
  @Input() configuration: IonModalConfiguration = {};

  @Output()
  ionOnHeaderButtonAction = new EventEmitter<IonModalResponse | undefined>();
  ionOnClose = new EventEmitter<IonModalResponse | undefined>();

  public DEFAULT_WIDTH = 500;

  private componentFactory: ComponentRef<unknown>;
  private _defaultModal: IonModalConfiguration = {
    title: 'Ion Modal',
    id: generateIDs('modal-', 'modal'),
    width: this.DEFAULT_WIDTH,
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
    if (this.configuration.preventCloseOnEscKey) {
      return;
    }
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

  setContentInstanceParams<T>(
    instance: T,
    params: Partial<T> | undefined
  ): void {
    Object.assign(instance, params);
  }

  emitHeaderButtonAction(valueToEmit: IonModalResponse | undefined): void {
    this.ionOnHeaderButtonAction.emit(valueToEmit);
  }

  ngOnInit(): void {
    this.setDefaultConfig();
    const factory = this.resolver.resolveComponentFactory(this.componentToBody);
    this.componentFactory = this.modalBody.createComponent(factory);

    if (this.configuration.ionParams) {
      this.setContentInstanceParams(
        this.getChildComponentPropertiesValue(),
        this.configuration.ionParams
      );
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dialogElement.nativeElement.focus();
    });
  }
}
