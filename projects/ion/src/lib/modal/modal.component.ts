import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
  signal,
  ComponentRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { generateIDs } from '../utils';
import { IonModalConfiguration, IonModalResponse } from '../core/types/modal';
import { IonButtonComponent } from '../button/button.component';
import { IonAlertComponent } from '../alert/alert.component';

const defaultModal: IonModalConfiguration = {
  title: 'Ion Modal',
  id: generateIDs('modal-', 'modal'),
  width: 500,
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

@Component({
  selector: 'ion-modal',
  standalone: true,
  imports: [CommonModule, IonButtonComponent, IonAlertComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalBody', { read: ViewContainerRef, static: true })
  modalBody!: ViewContainerRef;

  readonly componentToBody = input<Type<unknown>>();
  readonly configuration = signal<IonModalConfiguration>(defaultModal);

  @Output() ionOnHeaderButtonAction = new EventEmitter<
    IonModalResponse | undefined
  >();
  @Output() ionOnClose = new EventEmitter<IonModalResponse | undefined>();

  public DEFAULT_WIDTH = 500;

  private componentRef!: ComponentRef<any>;

  setConfig(config: IonModalConfiguration): void {
    if (config) {
      this.configuration.update((currentConfig) => ({
        ...currentConfig,
        ...config,
        footer: {
          ...currentConfig.footer,
          ...config.footer,
          primaryButton: {
            ...currentConfig.footer?.primaryButton,
            ...config.footer?.primaryButton,
          },
          secondaryButton: {
            ...currentConfig.footer?.secondaryButton,
            ...config.footer?.secondaryButton,
          },
        },
      }));
    }
  }

  setDefaultConfig(): void {
    // Already initialized with _defaultModal
  }

  getChildComponentPropertiesValue(): IonModalResponse {
    return this.componentRef.instance as { [key: string]: unknown };
  }

  closeModal(valueToEmit?: IonModalResponse | undefined): void {
    this.ionOnClose.emit(valueToEmit);
  }

  setContentInstanceParams<T>(
    instance: T,
    params: Partial<T> | undefined
  ): void {
    Object.assign(instance as any, params as any);
  }

  emitHeaderButtonAction(valueToEmit: IonModalResponse | undefined): void {
    this.ionOnHeaderButtonAction.emit(valueToEmit);
  }

  constructor() {
    effect(() => {
      const component = this.componentToBody();
      if (component && this.modalBody) {
        this.modalBody.clear();
        this.componentRef = this.modalBody.createComponent(component);

        if (this.configuration().ionParams) {
          this.setContentInstanceParams(
            this.componentRef.instance,
            this.configuration().ionParams
          );
        }
        this.componentRef.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    if (!this.configuration().id) {
      this.setDefaultConfig();
    }
  }

  ngAfterViewInit(): void {
    // Focus management is handled by CDK or manually if needed
  }
}
