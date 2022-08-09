import { IconType } from './../icon/icon.component';
import { Component, Input } from '@angular/core';
export type MenssageType =
  | 'random'
  | 'positive'
  | 'negative-1'
  | 'negative-2'
  | 'warning'
  | 'info';
@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() label!: string;
  @Input() iconType?: IconType = 'pencil';
  @Input() messageType?: MenssageType = 'info';
}
