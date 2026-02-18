import { Component, input, model } from '@angular/core';

import { IonRadioComponent } from '../radio/radio.component';
import { RadioOptions } from '../core/types/radio-group';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-radio-group',
  standalone: true,
  imports: [IonRadioComponent],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
})
export class IonRadioGroupComponent {
  name = input<string>('radio-group');
  options = input<RadioOptions[]>([]);
  disabled = input<boolean>(false);
  value = model<SafeAny>();

  handleSelection(optionValue: SafeAny): void {
    this.value.set(optionValue);
  }
}
