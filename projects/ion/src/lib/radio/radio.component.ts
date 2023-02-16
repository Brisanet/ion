import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class IonRadioComponent {
  @Input() label?: string;
  @Input() checked? = false;
  @Input() disabled? = false;

  check(): void {
    this.checked = true;
  }
}
