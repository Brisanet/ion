import { Component } from '@angular/core';
import { IonModalService } from '../ion-modal.service';

@Component({
  template: `
    <label for="name">Inform your name</label>
    <input
      style="margin: 8px 8px 16px"
      [(ngModel)]="name"
      type="text"
      name="name"
      id="name"
    />
    <ion-button
      [label]="'Save my name'"
      [disabled]="name?.length < 2"
      (ionOnClick)="this.closeModal()"
    ></ion-button>
  `,
})
export class InputMockComponent {
  constructor(private ionModalService: IonModalService) {}
  name: string;

  closeModal() {
    this.ionModalService.emitValueAndCloseModal({ name: this.name });
  }
}
