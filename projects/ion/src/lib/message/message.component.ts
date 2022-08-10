import { IconType } from './../icon/icon.component';
import { Component, Input, OnInit } from '@angular/core';

export type Statustype =
  | 'random'
  | 'positive'
  | 'negative1'
  | 'negative2'
  | 'warning'
  | 'info';

export const iconTypes = {
  random: 'plus-solid',
  positive: 'check-solid',
  negative1: 'exclamation-solid',
  negative2: 'close-solid',
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
  @Input() type?: Statustype = 'random';
  @Input() iconType?: IconType;

  setIcon() {
    this.iconType = iconTypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
