import { Component, Type } from '@angular/core';
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
  valueFromModal: { [key: string]: unknown };

  modalConfig: IonModalConfiguration;
  componentToBody: Type<unknown>;

  constructor(private ionModalService: IonModalService) {}

  openModal(): void {
    this.ionModalService
      .open(this.componentToBody, this.modalConfig)
      .subscribe((response: IonModalResponse) => {
        this.valueFromModal = response;
      });
  }
}
