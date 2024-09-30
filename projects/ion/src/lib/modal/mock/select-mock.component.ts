import { Component } from '@angular/core';

@Component({
  template: `
    <label>Choose one</label>
    <span>{{ label }}</span>
    <select
      style="padding: 5px;
    border: none;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 15%), 0 0 2px rgb(0 0 0 / 15%);
    background: white;
    margin-left: 16px
    "
      [(ngModel)]="state"
    >
      <option value="ceara">Ceará</option>
      <option value="espirito-santo">Espirito Santo</option>
    </select>
    <div style="display: flex; margin-top: 30px; justify-content: flex-end;">
      <ion-button label="Open Popconfirm" ionPopConfirm></ion-button>
    </div>
  `,
})
export class SelectMockComponent {
  state = 'ceara';
}
