import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  IonNotificationContainerComponent,
  NotificationItem,
} from './notification.container.component';
import { NotificationConfigOptions } from '../../core/types/notification';
import { StatusType } from '../../core/types/status';

@Injectable({
  providedIn: 'root',
})
export class IonNotificationService {
  private overlayRef: OverlayRef | null = null;
  private containerRef: IonNotificationContainerComponent | null = null;

  constructor(private overlay: Overlay) {}

  public success(
    title: string,
    message: string,
    options?: NotificationConfigOptions,
  ): void {
    this.show(title, message, 'success', options);
  }

  public info(
    title: string,
    message: string,
    options?: NotificationConfigOptions,
  ): void {
    this.show(title, message, 'info', options);
  }

  public warning(
    title: string,
    message: string,
    options?: NotificationConfigOptions,
  ): void {
    this.show(title, message, 'warning', options);
  }

  public error(
    title: string,
    message: string,
    options?: NotificationConfigOptions,
  ): void {
    this.show(title, message, 'negative', options); // 'negative' maps to error/negative type
  }

  private show(
    title: string,
    message: string,
    type: StatusType,
    options: NotificationConfigOptions = {},
  ): void {
    this.ensureOverlay();

    const id = this.generateId();
    const notification: NotificationItem = {
      id,
      title,
      message,
      type,
      ...options,
    };

    this.containerRef!.addNotification(notification);
  }

  private ensureOverlay(): void {
    if (!this.overlayRef) {
      // Create overlay
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .top('20px')
          .right('20px'),
        hasBackdrop: false,
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      });

      // Create portal and attach
      const portal = new ComponentPortal(IonNotificationContainerComponent);
      const componentRef = this.overlayRef.attach(portal);
      this.containerRef = componentRef.instance;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
