import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() label!: string;
  @Input() iconType?: 'pencil';
}
