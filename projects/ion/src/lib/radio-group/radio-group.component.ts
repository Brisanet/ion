import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioOptions, RadioSelectedOption } from '../core/types/radio-group';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class IonRadioGroupComponent {
  @Input() name = 'radio-group';
  @Input() options!: RadioOptions[];
  @Input() value!: SafeAny;
  @Output() valueChange = new EventEmitter<RadioSelectedOption>();

  setValue(option: RadioOptions): void {
    this.value = option.value;
    this.valueChange.emit({
      label: option.label,
      value: option.value,
      groupName: this.name,
    });
  }
}
