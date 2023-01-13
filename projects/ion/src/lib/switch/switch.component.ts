import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ion-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() value = false;
  @Output() atValueChange = new EventEmitter<boolean>();

  handleClick(value: boolean): void {
    this.value = !value;
    this.atValueChange.emit(this.value);
  }
}
