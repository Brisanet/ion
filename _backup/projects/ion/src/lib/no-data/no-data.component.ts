import { Component, Input } from '@angular/core';
import { IconType } from '../core/types';

@Component({
  selector: 'ion-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class IonNoDataComponent {
  @Input() iconType: IconType = 'exclamation-rounded';
  @Input() label = 'Não há dados';
}
