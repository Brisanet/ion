import { Component, Input } from '@angular/core';

export type AlertType = 'success' | 'info' | 'alert' | 'danger';

export interface IonAlertProps {
  message: string;
  type?: AlertType;
  closable?: boolean;
  width?: number;
  height?: number;
}

@Component({
  selector: 'ion-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() message!: string;
  @Input() type?: AlertType = 'success';
  @Input() closable? = false;
  @Input() width? = 235;
  @Input() height? = 30;
  // Waiting for more type of icons to be implemented
  // public icon: IconType;

  closeEvent() {
    document
      .getElementById('ion-alert')
      .setAttribute('style', 'display: none;');
  }
}
