import { Component, Input } from '@angular/core';
import { IconType } from '../icon/icon.component';

export interface NotificationProps {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  icon?: IconType;
}

@Component({
  selector: 'ion-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() title!: NotificationProps['title'];
  @Input() message!: NotificationProps['message'];
  @Input() icon?: NotificationProps['icon'];
}
