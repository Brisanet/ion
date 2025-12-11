import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { SwitchSize } from '../core/types/switch';

@Component({
  selector: 'ion-switch',
  standalone: true,
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSwitchComponent {
  value = input<boolean>(false);
  size = input<SwitchSize>('sm');
  disabled = input<boolean>(false);
  atValueChange = output<boolean>();

  private internalValue = signal<boolean>(false);

  public currentValue = computed(() => this.internalValue());

  constructor() {
    // Sync value input with internal state
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  handleClick(): void {
    const newValue = !this.internalValue();
    this.internalValue.set(newValue);
    this.atValueChange.emit(newValue);
  }
}
