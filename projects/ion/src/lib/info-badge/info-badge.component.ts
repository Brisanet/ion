import { Component, Input } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { InfoBadgeSize, InfoBadgeStatus } from '../core/types/info-badge';

export interface InfoBadgeProps {
  variant: InfoBadgeStatus;
  icon?: IconType;
  text?: string;
  size?: InfoBadgeSize;
}

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
