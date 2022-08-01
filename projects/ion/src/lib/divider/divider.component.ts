import { Component, Input } from '@angular/core';

type Orientation = 'horizontal' | 'vertical';

type DividerType = 'solid' | 'dashed' | 'text';

export interface IonDividerProps {
  label?: string;
  orientation?: Orientation;
  type?: DividerType;
}

@Component({
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class IonDividerComponent {
  @Input() label = '';
  @Input() orientation?: Orientation = 'horizontal';
  @Input() type?: DividerType = 'solid';
}
