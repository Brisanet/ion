import { Component, Input } from '@angular/core';

export type InputSize = 'sm' | 'md';

export interface IonInputProps {
  size: InputSize;
}

@Component({
  selector: 'ion-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.scss'],
})
export class InputContadorComponent {
  @Input() size: 'sm';
  @Input() cont = 0;

  public contMenos() {
    if (this.cont > 0) {
      this.cont--;
    }
  }

  public contMais() {
    this.cont++;
  }
}
