import { Component, Input, Output, EventEmitter } from '@angular/core';

export type InputCountSize = 'sm' | 'md';

export interface IonInputCount {
  InputSize: InputCountSize;
}

@Component({
  selector: 'ion-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.scss'],
})
export class InputCounterComponent {
  @Input() InputSize = 'md';
  @Input() count = 0;
  @Output() changedValue = new EventEmitter();

  private minValue = 0;

  public emitEvent(): void {
    this.changedValue.emit({ newValue: this.count });
  }

  public countDecrement(): void {
    if (this.count > this.minValue) {
      this.count--;
      this.emitEvent();
    }
  }

  public countIncrement(): void {
    this.count++;
    this.emitEvent();
  }
}
