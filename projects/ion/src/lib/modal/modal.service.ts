import { ComponentRef, inject, Injectable, Type } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

import { IonModalComponent } from './modal.component';
import {
  IonModalConfiguration,
  IonModalResponse,
  ModalControl,
} from '../core/types/modal';
import { SafeAny } from '../utils/safe-any';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private overlay = inject(Overlay);
  public readonly ionOnHeaderButtonAction = new Subject<SafeAny>();
  public modalsControls: ModalControl[] = [];

  private get currentModalControl(): ModalControl | undefined {
    return this.modalsControls[this.modalsControls.length - 1];
  }

  open(
    component: Type<unknown>,
    configuration?: IonModalConfiguration
  ): Observable<IonModalResponse | unknown> {
    const overlayConfig = this.createConfig(configuration);
    const overlayRef = this.overlay.create(overlayConfig);

    const modalPortal = new ComponentPortal(IonModalComponent);
    const componentRef = overlayRef.attach(modalPortal);

    const instance = componentRef.instance;

    const modalControl: ModalControl = {
      overlayRef,
      componentRef,
      subscriber: new Subject<IonModalResponse | unknown>(),
    };

    this.modalsControls.push(modalControl);

    instance.setConfig({
      ...configuration,
    });

    componentRef.setInput('componentToBody', component);

    componentRef.changeDetectorRef.detectChanges();

    instance.ionOnClose.subscribe((valueFromModal: IonModalResponse) => {
      if (!valueFromModal) {
        this.closeModal(modalControl);
        return;
      }

      if (instance.configuration().preventCloseOnConfirm) {
        modalControl.subscriber.next(valueFromModal);
        return;
      }

      this.emitValueAndCloseModal(valueFromModal, modalControl);
    });

    instance.ionOnHeaderButtonAction.subscribe(
      (valueFromModal: IonModalResponse) => {
        this.emitHeaderAction(valueFromModal);
      }
    );

    if (configuration?.overlayCanDismiss !== false) {
      overlayRef.backdropClick().subscribe(() => {
        this.closeModal(modalControl);
      });
    }

    if (configuration?.preventCloseOnEscKey !== true) {
      overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          this.closeModal(modalControl);
        }
      });
    }

    return modalControl.subscriber.asObservable();
  }

  emitValue(valueToEmit: IonModalResponse | unknown): void {
    if (this.currentModalControl) {
      this.currentModalControl.subscriber.next(valueToEmit);
    }
  }

  emitValueAndCloseModal(
    valueToEmit: IonModalResponse | unknown,
    modalControl?: ModalControl
  ): void {
    const control = modalControl || this.currentModalControl;
    if (control) {
      control.subscriber.next(valueToEmit);
      this.closeModal(control);
    }
  }

  emitHeaderAction(valueToEmit: IonModalResponse | unknown): void {
    this.ionOnHeaderButtonAction.next(valueToEmit);
  }

  closeModal(modalControlOrId?: ModalControl | string): void {
    let control: ModalControl | undefined;

    if (typeof modalControlOrId === 'string') {
      control = this.findModalControlById(modalControlOrId);
    } else if (modalControlOrId) {
      control = modalControlOrId;
    } else {
      control = this.currentModalControl;
    }

    if (control) {
      this.destroyModalControl(control);
    }
  }

  reconfigModal(configuration: IonModalConfiguration): void {
    if (this.currentModalControl) {
      this.currentModalControl.componentRef.instance.setConfig(configuration);
    }
  }

  public findModalControlById(id: string): ModalControl | undefined {
    return this.modalsControls.find(
      (modal) => modal.componentRef.instance.configuration().id === id
    );
  }

  private destroyModalControl(modalControl: ModalControl): void {
    modalControl.subscriber.complete();
    modalControl.overlayRef.dispose();

    this.modalsControls = this.modalsControls.filter(
      (modal) => modal !== modalControl
    );
  }

  private createConfig(config?: IonModalConfiguration): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config?.showOverlay !== false,
      backdropClass: 'ion-modal-backdrop',
      panelClass: 'ion-modal-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }
}
