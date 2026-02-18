
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'ion-radio',
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonRadioComponent {
  label = input<string>();
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  value = input<string>();
  id = input<string>();

  check(): void {
    if (!this.disabled()) {
      this.checked.set(true);
    }
  }
}
