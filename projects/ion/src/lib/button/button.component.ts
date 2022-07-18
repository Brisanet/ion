import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface IButton {
  label: string;
  type: 'primary' | 'secundary' | 'ghost' | 'dashed' | 'link';
  size: 'sm' | 'md' | 'lg' | 'xl';
  load: boolean;
}
@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string;
  @Input() type: IButton['type'] = 'primary';
  @Input() size: IButton['size'] = 'md';
  @Input() danger = false;
  @Input() disabled = false;
  @Output() ionOnClick = new EventEmitter();

  handleClick() {
    this.ionOnClick.emit();
  }
}
