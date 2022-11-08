import { Component, Input, Output, EventEmitter } from '@angular/core';

export type InputCountSize = 'sm' | 'md';

export interface IonInputCount {
  InputSize: InputCountSize;
}

@Component({
  selector: 'ion-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.scss'],
})
export class InputContadorComponent {
  @Input() InputSize = 'md';
  @Input() count = 0;
  @Output() changedValue = new EventEmitter();

  private minValue = 0;

  public countDecrement(): void {
    if (this.count > this.minValue) {
      this.count--;
      this.changedValue.emit({ newValue: this.count });
    }
  }

  public countIncrement(): void {
    this.count++;
    this.changedValue.emit({ newValue: this.count });
  }
}
