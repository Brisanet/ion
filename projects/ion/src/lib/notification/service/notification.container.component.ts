import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { IonNotificationComponent } from '../component/notification.component';
import { NotificationProps } from '../../core/types/notification';

export interface NotificationItem extends NotificationProps {
  id: string;
}

@Component({
  selector: 'ion-notification-container',
  imports: [IonNotificationComponent],
  template: `
    <div class="notification-container-wrapper">
      @for (notification of notifications(); track notification.id) {
        <ion-notification
          [title]="notification.title"
          [message]="notification.message"
          [icon]="notification.icon"
          [type]="notification.type || 'success'"
          [fixed]="notification.fixed || false"
          [fadeIn]="notification.fadeIn || 'fadeIn'"
          [fadeOut]="notification.fadeOut || 'fadeOut'"
          [pauseOnHover]="notification.pauseOnHover ?? true"
          (ionOnClose)="removeNotification(notification.id)"
        ></ion-notification>
      }
    </div>
  `,
  styles: [
    `
      .notification-container-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: none;
        /* Ensure proper gap between notifications */
        gap: 10px;
      }
      ion-notification {
        pointer-events: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonNotificationContainerComponent {
  notifications = signal<NotificationItem[]>([]);

  addNotification(notification: NotificationItem): void {
    this.notifications.update((current) => [...current, notification]);
  }

  removeNotification(id: string): void {
    this.notifications.update((current) => current.filter((n) => n.id !== id));
  }
}
