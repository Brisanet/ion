import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { RadioOptions } from '../core/types/radio-group';

@Component({
  selector: 'ion-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class IonRadioGroupComponent {
  @Input() name = 'radio-group';
  @Input() options!: RadioOptions[];
  @Input() value!: SafeAny;
  @Output() valueChange = new EventEmitter<SafeAny>();

  setValue(optionValue: SafeAny): void {
    this.value = optionValue;
    this.valueChange.emit(this.value);
  }
}
