import { IconType } from './../icon/icon.component';
import { Component, Input } from '@angular/core';

export type InputSize = 'sm' | 'md';

export interface IonInputCount {
  size: InputSize;
  iconDown: IconType;
  iconPlus: IconType;
}

@Component({
  selector: 'ion-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.scss'],
})
export class InputContadorComponent {
  @Input() size: 'sm';
  @Input() count = 0;
  @Input() iconSub = 'sub';
  @Input() iconPlus = 'add';

  public countSub() {
    if (this.count > 0) {
      this.count--;
    }
  }

  public countPlus() {
    this.count++;
  }
}
