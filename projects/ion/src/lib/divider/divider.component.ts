import { Component, Input } from '@angular/core';
import { DirectionType } from '../core/types';
import { DividerType } from '../core/types/divider';
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
