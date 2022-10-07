import { Component } from '@angular/core';

@Component({
  template: `
    <label>Choose one</label>
    <select
      style="padding: 5px;
    border: none;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 15%), 0px 0px 2px rgb(0 0 0 / 15%);
    background: white;
    margin-left: 16px
    "
      [(ngModel)]="state"
    >
      <option>Ceará</option>
      <option>Espirito Santo</option>
    </select>
  `,
})
export class SelectMockComponent {
  state = 'Ceará';
}
