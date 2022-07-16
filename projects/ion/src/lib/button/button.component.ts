import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface IButton {
  label: string;
  type: 'primary' | 'danger';
}
@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent {
  @Input() label: string;
  @Input() type: IButton['type'] = 'primary';

  @Output() ionOnClick = new EventEmitter();

  handleClick() {
    this.ionOnClick.emit();
  }
}
