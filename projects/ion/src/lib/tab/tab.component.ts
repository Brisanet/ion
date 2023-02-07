import { Component, Input } from '@angular/core';
import { IconType } from '../core/types/icon';
import { IonTabProps } from '../core/types/tab';

@Component({
  selector: 'ion-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class IonTabComponent {
  @Input() label!: string;
  @Input() tabSize?: IonTabProps['tabSize'] = 'sm';
  @Input() disabled?: boolean;
  @Input() selected?: boolean;
  @Input() direction?: IonTabProps['direction'] = 'bottom';
  @Input() iconType?: IconType;
  @Input() badge?: IonTabProps['badge'];

  select(): void {
    this.selected = true;
  }
}
