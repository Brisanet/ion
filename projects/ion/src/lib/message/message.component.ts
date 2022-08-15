import { IconType } from './../icon/icon.component';
import { Component, Input, OnInit } from '@angular/core';

export interface IonMessageProps {
  label: string;
  type?: Statustype;
  iconType?: IconType;
}

export type Statustype =
  | 'positive'
  | 'negative_alert'
  | 'negative_erro'
  | 'warning'
  | 'info'
  | 'custom';

export const iconTypes = {
  positive: 'check-solid',
  negative_alert: 'exclamation-solid',
  negative_erro: 'close-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  custom: 'plus-solid',
};

@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() label!: string;
  @Input() type = 'positive';
  @Input() iconType;

  setIcon() {
    this.iconType = iconTypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
