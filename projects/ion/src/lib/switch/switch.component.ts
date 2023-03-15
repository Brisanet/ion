import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwitchSize } from '../core/types/switch';

@Component({
  selector: 'ion-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class IonSwitchComponent {
  @Input() value = false;
  @Input() size: SwitchSize = 'sm';
  @Input() disabled = false;
  @Output() atValueChange = new EventEmitter<boolean>();

  handleClick(value: boolean): void {
    this.value = !value;
    this.atValueChange.emit(this.value);
  }
}
