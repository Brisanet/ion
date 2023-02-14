import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Badge,
  ChipEvent,
  ChipSize,
  IonChipProps,
  RightBadge,
} from '../core/types/chip';
import { DropdownItem } from '../core/types/dropdown';
import { IconDirection, IconType } from '../core/types/icon';

@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class IonChipComponent {
  @Input() label!: string;
  @Input() disabled = false;
  @Input() selected = false;
  @Input() size?: ChipSize = 'sm';
  @Input() icon?: IconType;
  @Input() showDropdown = false;
  @Input() dropdownSearchConfig: IonChipProps['dropdownSearchConfig'];
  @Input() options: DropdownItem[];
  @Input() multiple = false;
  @Input() infoBadge?: IonChipProps['infoBadge'];
  @Input() iconPosition?: IconDirection = 'left';
  @Input() rightBadge?: RightBadge;

  @Output() events = new EventEmitter<ChipEvent>();
  @Output() dropdownEvents = new EventEmitter<DropdownItem[]>();
  @Output() dropdownSearchEvents = new EventEmitter<string>();

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

  selectDropdownItem(selecteds: DropdownItem[]): void {
    this.dropdownEvents.emit(selecteds);

    if (selecteds && this.multiple) {
      this.badge.value = selecteds.length;
    }

    if (!this.multiple) {
      this.label = selecteds[0].label;
      this.selected = false;
      this.toggleDropdown();
    }
  }

  dropdownSearchChange(value: string): void {
    this.dropdownSearchEvents.emit(value);
  }
}
