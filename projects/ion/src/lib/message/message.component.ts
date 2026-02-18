import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { IonIconComponent } from '../icon/icon.component';
import { IconType } from '../core/types/icon';
import { MessageStatusType } from '../core/types/message';

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
  imports: [IonIconComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonMessageComponent {
  label = input.required<string>();
  type = input<MessageStatusType>('positive');
  iconType = input<IconType>();

  computedIcon = computed(() => {
    const userIcon = this.iconType();
    if (userIcon) {
      return userIcon;
    }
    return icontypes[this.type()] as string;
  });
}
