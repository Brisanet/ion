import { IconType } from './../icon/icon.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownItem } from '../dropdown/dropdown.component';
import { InfoBadgeStatus } from '../core/types';

export type ChipSize = 'sm' | 'md';
export type Direction = 'right' | 'left';

interface ChipEvent {
  selected: boolean;
  disabled: boolean;
}
export interface IonChipProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  size?: ChipSize;
  events?: EventEmitter<ChipEvent>;
  options?: DropdownItem[];
  icon?: string;
  multiple?: boolean;
  infoBadge?: InfoBadgeStatus;
  iconPosition?: Direction;
}

type Badge = {
  value: number;
};

@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() label!: string;
  @Input() disabled? = false;
  @Input() selected? = false;
  @Input() size?: ChipSize = 'sm';
  @Input() icon?: IconType;
  @Input() showDropdown = false;
  @Input() options: DropdownItem[];
  @Input() multiple?: boolean = false;
  @Input() infoBadge?: IonChipProps['infoBadge'];
  @Input() iconPosition?: Direction = 'right';

  @Output() events = new EventEmitter<ChipEvent>();

  public badge: Badge = {
    value: 0,
  };

  select() {
    this.toggleDropdown();
    this.selected = !this.selected;
    this.events.emit({
      selected: this.selected,
      disabled: this.disabled,
    });
  }

  toggleDropdown() {
    if (this.options) {
      this.showDropdown = !this.showDropdown;
    }
  }

  handleSuccess(selecteds: DropdownItem[]) {
    if (selecteds) {
      this.badge.value = selecteds.length;
    }

    if (!this.multiple) {
      this.label = selecteds[0].label;
    }

    this.toggleDropdown();
  }
}
