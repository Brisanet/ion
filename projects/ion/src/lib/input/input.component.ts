import { IconType } from '../icon/icon.component';
import { Component, Input } from '@angular/core';

export interface IonInputProps {
  label?: string;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'ion-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label?: string;
  @Input() disabled? = false;
  @Input() icon?: IconType;
}
