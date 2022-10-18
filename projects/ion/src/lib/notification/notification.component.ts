import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../icon/icon.component';
import { fadeInDirection, fadeOutDirection } from '../utils/animationsTypes';
import { setTimer } from '../utils';

export interface NotificationProps {
  title: string;
  message: string;
  type?: StatusType;
  icon?: IconType;
  fixed?: boolean;
  fadeIn?: fadeInDirection;
  fadeOut?: fadeOutDirection;
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
  @Input() type?: NotificationProps['type'] = 'success';
  @Input() fixed?: NotificationProps['fixed'] = false;
  @Input() fadeIn?: NotificationProps['fadeIn'] = 'fadeIn';
  @Input() fadeOut?: NotificationProps['fadeOut'] = 'fadeOut';
  @ViewChild('notificationRef', { static: false }) notification: ElementRef;

  private timer: ReturnType<typeof setTimeout>;

  public getIcon(): IconType {
    const icons = {
      success: 'check-solid',
      info: 'info-solid',
      warning: 'exclamation-solid',
      negative: 'close-solid',
    };
    return icons[this.type];
  }

  public getClass() {
    if (this.icon) {
      return 'default-icon';
    }
    return `default-icon ${this.type}-icon`;
  }

  public timeByWords(message: string): number {
    const wordsBySecond = 3;

    // margin is one second
    const marginOfError = 1;
    const second = 1000;
    const result = message.split(' ').length / wordsBySecond + marginOfError;
    return Number(result.toFixed(0)) * second;
  }

  closeNotification() {
    this.notification.nativeElement.classList.add(this.fadeOut);
    setTimer().subscribe(() => {
      this.notification.nativeElement.remove();
    });
  }

  closeAuto(closeIn: number = this.timeByWords(this.message)) {
    if (this.fixed) {
      return;
    }
    setTimer(closeIn).subscribe(() => {
      this.closeNotification();
    });
  }

  mouseEnter() {
    clearTimeout(this.timer);
  }

  mouseLeave() {
    this.closeAuto();
  }

  setClass() {
    return `notification-container ${this.fadeIn}`;
  }

  ngOnInit() {
    this.closeAuto();
  }
}
