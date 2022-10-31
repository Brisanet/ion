import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../icon/icon.component';

export interface IonAlertProps {
  message: string;
  type?: StatusType;
  closable?: boolean;
  hideBackground?: boolean;
}

export const iconTypes = {
  success: 'check-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  negative: 'close-solid',
};

@Component({
  selector: 'ion-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() message!: string;
  @Input() type?: StatusType = 'success';
  @Input() closable? = false;
  @Input() hideBackground? = false;

  @ViewChild('ionAlert', { static: false }) private ionAlert: ElementRef;

  iconType: IconType;

  closeEvent(): void {
    this.ionAlert.nativeElement.remove();
  }

  setIcon(): void {
    this.iconType = iconTypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
