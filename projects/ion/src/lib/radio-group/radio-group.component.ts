import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() label?: string;
  @Input() checked? = false;
  @Input() disabled? = false;

  check(): void {
    this.checked = true;
  }
}
