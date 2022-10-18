import { Component, ViewContainerRef, Type } from '@angular/core';
import { IonModalService } from '../modal.service';
import {
  IonModalConfiguration,
  IonModalResponse,
} from '../models/modal.interface';

@Component({
  selector: 'open-modal-button',
  template: `
    <ion-button [label]="'Open Modal'" (ionOnClick)="openModal()"></ion-button>
  `,
})
export class OpenModalButtonComponent {
  constructor(
    private ionModalService: IonModalService,
    private containerRef: ViewContainerRef
  ) {}

  valueFromModal: { [key: string]: unknown };

  modalConfig: IonModalConfiguration;
  componentToBody: Type<unknown>;

  openModal() {
    this.ionModalService
      .open(this.containerRef, this.componentToBody, this.modalConfig)
      .subscribe((response: IonModalResponse) => {
        this.valueFromModal = response;
      });
  }
}
