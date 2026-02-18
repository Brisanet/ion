
import { Component, input } from '@angular/core';
import { InfoBadgeSize, InfoBadgeStatus } from '../core/types/info-badge';
import { IconType } from '../core/types/icon';
import { IonIconComponent } from '../icon/icon.component';

@Component({
  selector: 'ion-info-badge',
  standalone: true,
  imports: [IonIconComponent],
  templateUrl: './info-badge.component.html',
  styleUrls: ['./info-badge.component.scss'],
})
export class IonInfoBadgeComponent {
  variant = input<InfoBadgeStatus>('primary');
  icon = input<IconType>();
  text = input<string>();
  size = input<InfoBadgeSize>('md');
}
