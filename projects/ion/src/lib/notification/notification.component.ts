import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../icon/icon.component';

export interface NotificationProps {
  title: string;
  message: string;
  type?: StatusType;
  icon?: IconType;
  fixed?: boolean;
}

@Component({
  selector: 'ion-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() title!: NotificationProps['title'];
  @Input() message!: NotificationProps['message'];
  @Input() icon?: NotificationProps['icon'];
  @Input() type?: NotificationProps['type'] = 'success';
  @Input() fixed?: NotificationProps['fixed'] = false;
  @ViewChild('notificationRef', { static: false }) notification: ElementRef;

  private timer: ReturnType<typeof setTimeout>;

  getIcon(): IconType {
    const icons = {
      success: 'check-solid',
      info: 'info-solid',
      warning: 'exclamation-solid',
      negative: 'close-solid',
    };
    return icons[this.type];
  }

  getClass(): string {
    if (this.icon) {
      return 'default-icon';
    }
    return `default-icon ${this.type}-icon`;
  }

  timeByWords(message: string): number {
    const wordsBySecond = 3;

    // margin is one second
    const marginOfError = 1;
    const second = 1000;
    const result = message.split(' ').length / wordsBySecond + marginOfError;
    return Number(result.toFixed(0)) * second;
  }

  closeNotification(): void {
    this.notification.nativeElement.remove();
  }

  closeAuto(closeIn: number = this.timeByWords(this.message)): void {
    if (this.fixed) {
      return;
    }
    this.timer = setTimeout(() => {
      this.closeNotification();
    }, closeIn);
  }

  mouseEnter(): void {
    clearTimeout(this.timer);
  }

  mouseLeave(): void {
    this.closeAuto();
  }

  ngOnInit(): void {
    this.closeAuto();
  }
}
