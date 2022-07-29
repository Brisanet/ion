import { Component, Input } from '@angular/core';

type Orientation = 'horizontal' | 'vertical';

type Type = 'solid' | 'dashed' | 'text';

export interface IonDividerProps {
  label?: string;
  orientation?: Orientation;
  type?: Type;
}

@Component({
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
  @Input() label?: string = '';
  @Input() orientation?: Orientation = 'horizontal';
  @Input() type?: Type = 'solid';
}
