import { Component, Input } from '@angular/core';
import { DirectionType } from '../core/types';

type DividerType = 'solid' | 'dashed' | 'text';

export interface IonDividerProps {
  label?: string;
  direction?: DirectionType;
  type?: DividerType;
  margin?: boolean;
}

@Component({
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class IonDividerComponent {
  @Input() label = '';
  @Input() direction?: DirectionType = 'horizontal';
  @Input() type?: DividerType = 'solid';
  @Input() margin? = false;
}
