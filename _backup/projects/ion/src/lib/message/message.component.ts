import { Component, Input, OnInit } from '@angular/core';
import { IconType } from '../core/types/icon';

const icontypes = {
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
export class IonMessageComponent implements OnInit {
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
