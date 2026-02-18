import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  effect,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonButtonComponent } from '../button/button.component';
import { InputCountSize } from '../core/types';

@Component({
  selector: 'ion-input-counter',
  imports: [FormsModule, IonButtonComponent],
  templateUrl: './input-counter.component.html',
  styleUrl: './input-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonInputCounterComponent {
  inputSize = input<InputCountSize>('md');
  maxValue = input<number | undefined>(undefined);
  minValue = input<number>(0);
  disabled = input<boolean>(false);
  maxDigits = input<number>(9);

  count = model<number>(0);

  changedValue = output<{ newValue: number }>();

  constructor() {
    // Initialize count to minValue if minValue is set and count is 0
    effect(() => {
      const min = this.minValue();
      const currentCount = this.count();
      if (min && !currentCount) {
        this.count.set(min);
      }
    });
  }

  emitEvent(): void {
    this.changedValue.emit({ newValue: this.count() });
  }

  countDecrement(): void {
    const currentCount = this.count();
    const min = this.minValue();
    if (currentCount > min) {
      this.count.set(currentCount - 1);
      this.emitEvent();
    }
  }

  countIncrement(): void {
    const currentCount = this.count();
    const max = this.maxValue();
    if (max && max === currentCount) return;
    this.count.set(currentCount + 1);
    this.emitEvent();
  }

  changeCount(countStr: string): void {
    const countNumeric = Number(countStr);
    if (!isNaN(countNumeric)) {
      this.count.set(countNumeric);
    }
  }

  onBlurInput(): void {
    this.count.set(this.getValidCount());
    this.emitEvent();
  }

  private getValidCount(): number {
    const currentCount = this.count();
    const min = this.minValue();
    const max = this.maxValue();

    if (currentCount < min) {
      return min;
    } else if (max && currentCount > max) {
      return max;
    }
    return currentCount;
  }
}
