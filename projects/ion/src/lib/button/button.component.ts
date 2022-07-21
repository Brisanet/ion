import { Component, Input, Output, EventEmitter } from '@angular/core';

type Type = 'primary' | 'secundary' | 'ghost' | 'dashed';
type Size = 'sm' | 'md' | 'lg' | 'xl';
export interface IonButtonProps {
  label: string;
  type: Type;
  size: Size;
  expand: boolean;
  danger: boolean;
  disabled: boolean;
  load: boolean;
}
@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string;
  @Input() type: Type = 'primary';
  @Input() size: Size = 'md';
  @Input() expand = false;
  @Input() danger = false;
  @Input() disabled = false;
  @Output() ionOnClick = new EventEmitter();

  handleClick() {
    this.ionOnClick.emit();
  }
}
