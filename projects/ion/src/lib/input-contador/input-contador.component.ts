import { IconType } from './../icon/icon.component';
import { Component, Input } from '@angular/core';

export type InputSize = 'sm' | 'md';

export interface IonInputCount {
  size: InputSize;
  iconDown: IconType;
  iconAdd: IconType;
}

@Component({
  selector: 'ion-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.scss'],
})
export class InputContadorComponent {
  @Input() size = 'md';
  @Input() count = 0;
  @Input() iconSub = 'sub';
  @Input() iconAdd = 'add';

  private minValue = 0;

  public countDecrement(): void {
    if (this.count > this.minValue) {
      this.count--;
    }
  }

  public countIncrement(): void {
    this.count++;
  }
}
