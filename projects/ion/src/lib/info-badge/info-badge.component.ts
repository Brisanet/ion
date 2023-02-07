import { Component, Input } from '@angular/core';
import { InfoBadgeSize, InfoBadgeStatus } from '../core/types/info-badge';
import { IconType } from '../core/types/icon';

@Component({
  selector: 'ion-info-badge',
  templateUrl: './info-badge.component.html',
  styleUrls: ['./info-badge.component.scss'],
})
export class IonInfoBadgeComponent {
  @Input() public variant: InfoBadgeStatus = 'primary';
  @Input() public icon?: IconType;
  @Input() public text?: string;
  @Input() public size?: InfoBadgeSize = 'md';
}
