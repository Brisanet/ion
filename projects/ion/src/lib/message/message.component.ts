import { StatusType } from './../core/types/status';
import { IconType } from './../icon/icon.component';
import { Component, Input } from '@angular/core';
export type MenssageType =
  | 'random'
  | 'positive'
  | 'negative-1'
  | 'negative-2'
  | 'warning'
  | 'info';

export const iconTypes = {
  success: 'check-solid',
};
@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() label!: string;
  @Input() type?: StatusType;
  @Input() iconType?: IconType;
  @Input() messageType?: MenssageType;

  setIcon() {
    this.iconType = iconTypes[this.type];
  }
}
