import { Component, Input } from '@angular/core';

export type IconDirection = 'left' | 'right';

export interface IonInputProps {
  label?: string;
  disabled?: boolean;
  iconDirection?: IconDirection;
}

@Component({
  selector: 'ion-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label?: string;
  @Input() disabled? = false;
  @Input() iconDirection?: IconDirection;
}
