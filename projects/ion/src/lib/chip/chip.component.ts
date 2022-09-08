import { IconType } from './../icon/icon.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownItem } from '../dropdown/dropdown.component';

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
}

type Badge = {
  value: number;
  show: boolean;
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

  @Output() events = new EventEmitter<ChipEvent>();
  public innerBadge: Badge = {
    value: 0,
    show: false,
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

  handleSuccess(event: DropdownItem[]) {
    console.log(this.innerBadge);
    if (event) {
      this.innerBadge.show = false;
      this.innerBadge.value = event.length;
      this.innerBadge.show = true;
    }

    if (!this.multiple) {
      this.label = event[0].label;
    }

    this.toggleDropdown();
  }
}
