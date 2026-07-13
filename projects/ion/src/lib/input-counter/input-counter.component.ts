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
  placeholder = input<string>('');
  initialValue = input<string | number | undefined>(undefined);

  count = model<number | null>(0);

  changedValue = output<{ newValue: number }>();

  constructor() {
    effect(() => {
      const initial = this.initialValue();
      const currentCount = this.count();

      if (initial !== undefined && currentCount === 0) {
        if (initial === '') {
          this.count.set(null);
        } else {
          const numValue = typeof initial === 'number' ? initial : Number(initial);
          this.count.set(isNaN(numValue) ? 0 : numValue);
        }
      }
    });
  }

  emitEvent(): void {
    const currentCount = this.count();
    const valueToEmit = currentCount ?? this.minValue();
    this.changedValue.emit({ newValue: valueToEmit });
  }

  countDecrement(): void {
    const currentCount = this.count();
    if (currentCount === null) return;

    const min = this.minValue();
    if (currentCount > min) {
      this.count.set(currentCount - 1);
      this.emitEvent();
    }
  }

  countIncrement(): void {
    const currentCount = this.count();
    const max = this.maxValue();

    const valueToIncrement = currentCount ?? 0;
    if (max && max === valueToIncrement) return;

    this.count.set(valueToIncrement + 1);
    this.emitEvent();
  }

  changeCount(countStr: string): void {
    if (countStr === '' && this.initialValue() === '') {
      this.count.set(null);
      return;
    }

    if (countStr === '' && this.initialValue() !== '') {
      this.count.set(0);
      return;
    }

    const countNumeric = Number(countStr);
    if (!isNaN(countNumeric)) {
      this.count.set(countNumeric);
    }
  }

  onBlurInput(): void {
    this.count.set(this.getValidCount());
    this.emitEvent();
  }

  private getValidCount(): number | null {
    const currentCount = this.count();

    if (currentCount === null && this.initialValue() === '') {
      return null;
    }

    if (currentCount === null && this.initialValue() !== '') {
      return this.minValue();
    }

    const min = this.minValue();
    const max = this.maxValue();

    if (currentCount !== null && currentCount < min) {
      return min;
    } else if (currentCount !== null && max && currentCount > max) {
      return max;
    }
    return currentCount;
  }
}
