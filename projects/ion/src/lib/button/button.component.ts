import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface IonButtonProps {
  label: string;
  type: 'primary' | 'secundary' | 'ghost' | 'dashed';
  size: 'sm' | 'md' | 'lg' | 'xl';
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
  @Input() type: IonButtonProps['type'] = 'primary';
  @Input() size: IonButtonProps['size'] = 'md';
  @Input() expand = false;
  @Input() danger = false;
  @Input() disabled = false;
  @Output() ionOnClick = new EventEmitter();

  handleClick() {
    this.ionOnClick.emit();
  }
}
