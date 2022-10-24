import { Component } from '@angular/core';
import { IonModalService } from '../modal.service';

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
      (ionOnClick)="this.save()"
    ></ion-button>
  `,
})
export class InputMockComponent {
  constructor(private ionModalService: IonModalService) {}
  name: string;

  save() {
    this.ionModalService.emitValueAndCloseModal({ name: this.name });
  }
}
