import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../icon/icon.component';
import { fadeInDirection, fadeOutDirection } from '../utils/animationsTypes';
import { Subscription } from 'rxjs';
import { setTimer } from '../utils/setTimer';

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
export class NotificationComponent implements OnInit {
  @Input() title!: NotificationProps['title'];
  @Input() message!: NotificationProps['message'];
  @Input() icon?: NotificationProps['icon'];
  @Input() type?: NotificationProps['type'] = 'success';
  @Input() fixed?: NotificationProps['fixed'] = false;
  @Input() fadeIn?: NotificationProps['fadeIn'] = 'fadeIn';
  @Input() fadeOut?: NotificationProps['fadeOut'] = 'fadeOut';
  @ViewChild('notificationRef', { static: false }) notification: ElementRef;

  private timer$: Subscription;

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
    this.notification.nativeElement.classList.add(this.fadeOut);
    setTimer().subscribe(() => {
      this.notification.nativeElement.remove();
    });
  }

  closeAuto(closeIn: number = this.timeByWords(this.message)): void {
    if (this.fixed) {
      return;
    }
    this.timer$ = setTimer(closeIn).subscribe(() => {
      this.closeNotification();
    });
  }

  mouseEnter(): void {
    this.timer$.unsubscribe();
  }

  mouseLeave(): void {
    this.closeAuto();
  }

  setClass(): string {
    return `notification-container ${this.fadeIn}`;
  }

  ngOnInit(): void {
    this.closeAuto();
  }
}
