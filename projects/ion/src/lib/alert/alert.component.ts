import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { StatusType } from '../core/types/status';
import { IconType } from '../icon/icon.component';

export interface IonAlertProps {
  message: string;
  type?: StatusType;
  closable?: boolean;
}

@Component({
  selector: 'ion-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() message!: string;
  @Input() type?: StatusType = 'success';
  @Input() closable? = false;
  public iconType: IconType;
  @ViewChild('ionAlert', { static: false }) private ionAlert: ElementRef;

  closeEvent() {
    this.ionAlert.nativeElement.remove();
  }

  setIcon() {
    switch (this.type) {
      case 'danger':
        this.iconType = 'close-solid';
        break;
      case 'info':
        this.iconType = 'info-solid';
        break;
      case 'alert':
        this.iconType = 'exclamation-solid';
        break;
      case 'success':
        this.iconType = 'check-solid';
        break;
    }
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
