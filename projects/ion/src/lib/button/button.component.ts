import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';

type Type = 'primary' | 'secondary' | 'ghost' | 'dashed';
type Size = 'sm' | 'md' | 'lg' | 'xl';
export interface IonButtonProps {
  label?: string;
  type?: Type;
  size?: Size;
  expand?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  iconType?: IconType;
  rightSideIcon?: boolean;
  circularButton?: boolean;
  ionOnClick?: EventEmitter<SafeAny>;
}
@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() type?: Type = 'primary';
  @Input() size?: Size = 'md';
  @Input() expand? = false;
  @Input() danger? = false;
  @Input() disabled? = false;
  @Input() loading? = false;
  @Input() loadingMessage = 'Carregando...';
  @Input() iconType? = '';
  @Input() rightSideIcon? = false;
  @Input() circularButton? = false;
  @Output() ionOnClick? = new EventEmitter();

  handleClick(): void {
    if (!this.loading && !this.disabled) {
      this.ionOnClick.emit();
    }
  }
}
