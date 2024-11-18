import { IonNotificationComponent } from '../component/notification.component';
import { Component, ComponentRef, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'notification-container',
  template: '',
  styleUrls: ['notification.container.scss'],
})
export class IonNotificationContainerComponent {
  private notificationRefControl: ComponentRef<IonNotificationComponent>[] = [];
  constructor(private renderer: Renderer2, private element: ElementRef) {}

  addNotification(
    notification: ComponentRef<IonNotificationComponent>,
    maxStack: number
  ): void {
    if (this.notificationRefControl.length === maxStack) {
      this.notificationRefControl[0].instance.ionOnClose.complete();
      this.removeNotification(
        this.notificationRefControl[0].location.nativeElement
      );
      this.notificationRefControl.shift();
    }

    this.notificationRefControl.push(notification);
    notification.instance.ionOnClose.subscribe(() => {
      this.removeNotification(notification.location.nativeElement);
      this.notificationRefControl = this.notificationRefControl.filter(
        (value) => value !== notification
      );
    });

    this.renderer.appendChild(
      this.element.nativeElement,
      notification.location.nativeElement
    );
  }

  removeNotification(notification: ElementRef): void {
    this.renderer.removeChild(this.element.nativeElement, notification);
  }
}
