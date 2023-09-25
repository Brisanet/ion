import { Component, OnInit } from '@angular/core';
import { IonModalService } from '../modal.service';

@Component({
  template: `
    <label>Choose one</label>
    <span>{{ label }}</span>
    <select
      style="padding: 5px;
    border: none;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 15%), 0px 0px 2px rgb(0 0 0 / 15%);
    background: white;
    margin-left: 16px
    "
      [(ngModel)]="state"
    >
      <option value="ceara">Ceará</option>
      <option value="espirito-santo">Espirito Santo</option>
    </select>
  `,
})
export class SelectMockComponent implements OnInit {
  state = 'ceara';
  constructor(private ionModalService: IonModalService) {}

  ngOnInit(): void {
    this.ionModalService.ionOnHeaderButtonAction.subscribe(() => {
      this.state = 'espirito-santo';
    });
  }
}
