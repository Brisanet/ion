import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonInputCount } from '../core/types';

@Component({
  selector: 'ion-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.scss'],
})
export class IonInputCounterComponent implements OnInit {
  @Input() inputSize: IonInputCount['inputSize'] = 'md';
  @Input() maxValue?: number;
  @Input() minValue = 0;
  @Input() disabled = false;
  @Input() count = 0;
  @Input() maxDigits = 9;
  @Output() changedValue = new EventEmitter();

  ngOnInit(): void {
    if (this.minValue && !this.count) {
      this.count = this.minValue;
    }
  }

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
    if (this.maxValue && this.maxValue === this.count) return;
    this.count++;
    this.emitEvent();
  }

  public changeCount(count: string): void {
    const countNumeric = Number(count);
    if (!isNaN(countNumeric)) {
      this.count = countNumeric;
    }
  }

  public onBlurInput(): void {
    this.count = this.getValidCount();
    this.emitEvent();
  }

  private getValidCount(): number {
    if (this.count < this.minValue) {
      return this.minValue;
    } else if (this.maxValue && this.count > this.maxValue) {
      return this.maxValue;
    }
    return this.count;
  }
}
