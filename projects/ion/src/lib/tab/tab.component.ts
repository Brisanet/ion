import { Component, Input } from '@angular/core';
import { IconType } from '../icon/icon.component';

type TabSize = 'sm' | 'md' | 'lg';
type Direction = 'bottom' | 'top' | 'right' | 'left';

interface BadgeOptions {
  value: number;
}

export interface IonTabProps {
  label: string;
  tabSize?: TabSize;
  disabled?: boolean;
  selected?: boolean;
  direction?: Direction;
  iconType?: IconType;
  badge?: BadgeOptions;
}

@Component({
  selector: 'ion-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() label!: string;
  @Input() tabSize?: TabSize = 'sm';
  @Input() disabled?: boolean;
  @Input() selected?: boolean;
  @Input() direction?: Direction = 'bottom';
  @Input() iconType?: IconType;
  @Input() badge?: BadgeOptions;

  select() {
    this.selected = !this.selected;
  }
}
