import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../icon/icon.component';

export interface IonAlertProps {
  message: string;
  type?: StatusType;
  closable?: boolean;
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

  @ViewChild('ionAlert', { static: false }) private ionAlert: ElementRef;

  public iconType: IconType;

  closeEvent() {
    this.ionAlert.nativeElement.remove();
  }

  setIcon() {
    this.iconType = iconTypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
