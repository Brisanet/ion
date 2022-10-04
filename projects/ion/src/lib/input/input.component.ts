import { IconType } from './../icon/icon.component';
import { Component, Input } from '@angular/core';

export type IconDirection = 'left' | 'right';

export interface IonInputProps {
  iconInput?: string;
  disabled?: boolean;
  iconDirection?: IconDirection;
}

@Component({
  selector: 'ion-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() iconInput: IconType;
  @Input() disabled? = false;
  @Input() iconDirection?: IconDirection;
}
