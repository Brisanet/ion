import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoBadgeStatus } from '../core/types';
import { DropdownItem } from '../dropdown/dropdown.component';
import { IconType } from './../icon/icon.component';

export type ChipSize = 'sm' | 'md';

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

  @Output() events = new EventEmitter<ChipEvent>();

  badge: Badge = {
    value: 0,
  };

  select(): void {
    this.toggleDropdown();
    this.selected = !this.selected;
    this.events.emit({
      selected: this.selected,
      disabled: this.disabled,
    });
  }

  toggleDropdown(): void {
    if (this.options) {
      this.showDropdown = !this.showDropdown;
    }
  }

  handleSuccess(selecteds: DropdownItem[]): void {
    if (selecteds && this.multiple) {
      this.badge.value = selecteds.length;
    }

    if (!this.multiple) {
      this.label = selecteds[0].label;
      this.selected = false;
      this.toggleDropdown();
    }
  }
}
