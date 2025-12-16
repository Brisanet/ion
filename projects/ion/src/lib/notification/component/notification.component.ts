import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../../icon/icon.component';
import { IconType } from '../../core/types/icon';
import { StatusType } from '../../core/types/status';
import { fadeInDirection, fadeOutDirection } from '../../utils/animationsTypes';

@Component({
  selector: 'ion-notification',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonNotificationComponent implements OnInit, OnDestroy {
  title = input.required<string>();
  message = input.required<string>();
  icon = input<IconType>();
  type = input<StatusType>('success');
  fixed = input(false);
  fadeIn = input<fadeInDirection>('fadeIn');
  fadeOut = input<fadeOutDirection>('fadeOut');

  ionOnClose = output<void>();

  @ViewChild('notificationRef', { static: false }) notification!: ElementRef;

  private autoCloseTimer?: ReturnType<typeof setTimeout>;
  private closeAnimationTimer?: ReturnType<typeof setTimeout>;
  private isClosing = false;

  public getIcon = computed(() => {
    const icons = {
      success: 'check-solid',
      info: 'info-solid',
      warning: 'exclamation-solid',
      negative: 'close-solid',
    };
    return icons[this.type()] as IconType;
  });

  public iconToDisplay = computed(() => {
    return this.icon() || this.getIcon();
  });

  public containerClass = computed(() => {
    return `notification-container ${this.fadeIn()}`;
  });

  public iconClass = computed(() => {
    if (this.icon()) {
      return 'default-icon';
    }
    return `default-icon ${this.type()}-icon`;
  });

  closeNotification(): void {
    if (this.isClosing) {
      return;
    }
    this.isClosing = true;

    // Clear auto-close timer if manual close is triggered
    clearTimeout(this.autoCloseTimer);

    const element = this.notification.nativeElement;
    element.classList.add(this.fadeOut());

    this.closeAnimationTimer = setTimeout(() => {
      // Double check not destroyed just in case
      this.ionOnClose.emit();
    }, 1000);
  }

  ngOnInit(): void {
    if (!this.fixed()) {
      const timeToClose = this.timeByWords(this.message());
      this.autoCloseTimer = setTimeout(() => {
        this.closeNotification();
      }, timeToClose);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.autoCloseTimer);
    clearTimeout(this.closeAnimationTimer);
  }

  timeByWords(message: string): number {
    const wordsBySecond = 3;
    const marginOfError = 1;
    const second = 1000;
    const result = message.split(' ').length / wordsBySecond + marginOfError;
    return Number(result.toFixed(0)) * second;
  }
}
