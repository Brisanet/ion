import { IconType } from './../icon/icon.component';
import { Component, Input, OnInit } from '@angular/core';

export interface IonMessageProps {
  label: string;
  type?: Statustype;
  iconType?: IconType;
}

export type Statustype =
  | 'random'
  | 'positive'
  | 'negative_alert'
  | 'negative_erro'
  | 'warning'
  | 'info';

export const iconTypes = {
  random: 'plus-solid',
  positive: 'check-solid',
  negative_alert: 'exclamation-solid',
  negative_erro: 'close-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
};

@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() label!: string;
  @Input() type = 'random';
  @Input() iconType;

  setIcon() {
    this.iconType = iconTypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
