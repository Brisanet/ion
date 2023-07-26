import { StatusType } from './../../core/types/status';
import { NotificationConfigOptions } from './../../core/types/notification';
import { IonNotificationComponent } from './../component/notification.component';
import {
  Injectable,
  ComponentRef,
  Inject,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { SafeAny } from './../../utils/safe-any';
import { IonNotificationContainerComponent } from './notification.container.component';

enum NOTIFICATION_TYPES {
  success = 'success',
  info = 'info',
  warning = 'warning',
  negative = 'negative',
}

@Injectable({
  providedIn: 'root',
})
export class IonNotificationService {
  private notificationContainerComponentRef: ComponentRef<IonNotificationContainerComponent>;
  private componentSubscriber!: Subject<SafeAny>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public success(
    title: string,
    message: string,
    options?: NotificationConfigOptions
  ): void {
    if (!this.notificationContainerComponentRef)
      this.createNotificationContainer();

    const notification = this.createNotificationInstance();

    this.configNotification(notification.instance, title, message, options);

    notification.hostView.detectChanges();
    notification.changeDetectorRef.detectChanges();

    this.notificationContainerComponentRef.instance.addNotification(
      notification
    );

    this.notificationContainerComponentRef.changeDetectorRef.detectChanges();

    return this.componentSubscriber.next();
  }

  public info(
    title: string,
    message: string,
    options?: NotificationConfigOptions
  ): void {
    if (!this.notificationContainerComponentRef)
      this.createNotificationContainer();

    const notification = this.createNotificationInstance();

    this.configNotification(
      notification.instance,
      title,
      message,
      options,
      NOTIFICATION_TYPES.info
    );

    notification.hostView.detectChanges();
    notification.changeDetectorRef.detectChanges();

    this.notificationContainerComponentRef.instance.addNotification(
      notification
    );

    this.notificationContainerComponentRef.changeDetectorRef.detectChanges();

    return this.componentSubscriber.next();
  }

  public warning(
    title: string,
    message: string,
    options?: NotificationConfigOptions
  ): void {
    if (!this.notificationContainerComponentRef)
      this.createNotificationContainer();

    const notification = this.createNotificationInstance();

    this.configNotification(
      notification.instance,
      title,
      message,
      options,
      NOTIFICATION_TYPES.warning
    );

    notification.hostView.detectChanges();
    notification.changeDetectorRef.detectChanges();

    this.notificationContainerComponentRef.instance.addNotification(
      notification
    );

    this.notificationContainerComponentRef.changeDetectorRef.detectChanges();

    return this.componentSubscriber.next();
  }

  public error(
    title: string,
    message: string,
    options?: NotificationConfigOptions
  ): void {
    if (!this.notificationContainerComponentRef)
      this.createNotificationContainer();

    const notification = this.createNotificationInstance();

    this.configNotification(
      notification.instance,
      title,
      message,
      options,
      NOTIFICATION_TYPES.negative
    );

    notification.hostView.detectChanges();
    notification.changeDetectorRef.detectChanges();

    this.notificationContainerComponentRef.instance.addNotification(
      notification
    );

    this.notificationContainerComponentRef.changeDetectorRef.detectChanges();

    return this.componentSubscriber.next();
  }

  private createComponentView(
    viewRef: ComponentRef<IonNotificationContainerComponent>
  ): void {
    this.appRef.attachView(viewRef.hostView);
    viewRef.changeDetectorRef.detectChanges();

    const notificationElement = viewRef.location.nativeElement;
    this.document.body.appendChild(notificationElement);

    this.componentSubscriber = new Subject<SafeAny>();
    this.componentSubscriber.asObservable();
  }

  private createNotificationContainer(): void {
    const containerRef = this.componentFactoryResolver
      .resolveComponentFactory(IonNotificationContainerComponent)
      .create(this.injector);

    this.notificationContainerComponentRef = containerRef;

    this.createComponentView(this.notificationContainerComponentRef);
  }

  private createNotificationInstance(): ComponentRef<IonNotificationComponent> {
    return this.componentFactoryResolver
      .resolveComponentFactory(IonNotificationComponent)
      .create(this.injector);
  }

  private configNotification(
    notification: IonNotificationComponent,
    title: string,
    message: string,
    options: NotificationConfigOptions,
    type: StatusType = 'success'
  ): void {
    notification.title = title;
    notification.message = message;
    notification.type = type;

    if (options) {
      Object.keys(options).forEach((prop) => {
        notification[prop] = options[prop];
      });
    }

    notification.ionOnClose.subscribe((eventResponse: SafeAny) => {
      if (!eventResponse) return notification.closeNotification();
    });
  }
}
