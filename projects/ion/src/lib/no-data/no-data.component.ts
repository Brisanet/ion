
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonIconComponent } from '../icon/icon.component';
import { IconType } from '../core/types';

@Component({
  selector: 'ion-no-data',
  standalone: true,
  imports: [IonIconComponent],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonNoDataComponent {
  iconType = input<IconType>('exclamation-rounded');
  label = input<string>('Não há dados');
}
