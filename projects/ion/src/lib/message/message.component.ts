import { Component, Input, OnInit } from '@angular/core';
import { IconType } from './../icon/icon.component';

export interface IonMessageProps {
  label: string;
  type?: MessageStatusType;
  iconType?: IconType;
}

export type MessageStatusType =
  | 'positive'
  | 'negative_alert'
  | 'negative_erro'
  | 'warning'
  | 'info'
  | 'custom';

export const icontypes = {
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
  @Input() iconType?: IconType;

  setIcon(): void {
    this.iconType = icontypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
