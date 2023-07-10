import { IonNotificationComponent } from './../notification.component';
import {
  Component,
  OnInit,
  ComponentRef,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'notification-container',
  template: '',
  styleUrls: ['notification.container.scss'],
})
export class IonNotificationContainerComponent {
  constructor(private renderer: Renderer2, private element: ElementRef) {}

  addNotification(notification: ComponentRef<IonNotificationComponent>): void {
    notification.instance.ionOnClose.subscribe(() => {
      this.removeNotification(notification.location.nativeElement);
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
