import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import {
  BadgeType,
  DropdownItem,
  DropdownParams,
  IconType,
  InfoBadgeStatus,
} from '../core/types';

import { SafeAny } from '../utils/safe-any';

export type ChipSize = 'sm' | 'md';
export type IconDirection = 'right' | 'left';

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
  iconPosition?: IconDirection;
  rightBadge?: RightBadge;
  disableVisibilityToggle?: boolean;
  dropdownEvents?: EventEmitter<DropdownItem[]>;
  dropdownSearchConfig?: Pick<DropdownParams, 'searchOptions' | 'enableSearch'>;
  dropdownSearchEvents?: EventEmitter<string>;
}

type Badge = {
  value: number;
};

interface RightBadge {
  label: string;
  type: BadgeType;
}

@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit, AfterViewInit, DoCheck {
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
  @Input() disableVisibilityToggle = false;

  @Output() events = new EventEmitter<ChipEvent>();
  @Output() dropdownEvents = new EventEmitter<DropdownItem[]>();
  @Output() dropdownSearchEvents = new EventEmitter<string>();

  id: string;
  badge: Badge = {
    value: 0,
  };

  select(): void {
    this.toggleDropdown();
    if (!this.options) {
      this.selected = !this.selected;
    }
    this.events.emit({
      selected: this.selected,
      disabled: this.disabled,
    });
  }

  toggleDropdown(): void {
    if (this.disableVisibilityToggle) {
      this.showDropdown = true;
      return;
    }

    if (this.options) {
      this.showDropdown = !this.showDropdown;
    }
  }

  clearBadgeValue(): void {
    this.setBadgeValue(0);
  }

  selectDropdownItem(selecteds: DropdownItem[]): void {
    this.dropdownEvents.emit(selecteds);

    if (selecteds && this.multiple) {
      this.setBadgeValue(selecteds.length);
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

  ngOnInit(): void {
    this.updateLabel();
    this.id = this.generateId();
  }

  generateId = (): string =>
    'ion-chip__container-dropdown__' +
    Math.floor(Math.random() * 100000000) +
    1;

  ngDoCheck(): void {
    this.updateLabel();
  }

  getSelectedOptions(): DropdownItem[] {
    return (this.options || []).filter((option) => option.selected);
  }

  ngAfterViewInit(): void {
    if (this.disableVisibilityToggle) {
      return;
    }

    document.addEventListener('mouseup', (e: SafeAny) => {
      const dropdownContainer = document.getElementById(this.id);
      if (dropdownContainer && !dropdownContainer.contains(e.target)) {
        this.showDropdown = false;
      }
    });
  }

  updateLabel(): void {
    if (this.multiple || (this.options && this.options.length === 0)) {
      return;
    }

    const [selectedOption] = this.getSelectedOptions();

    if (!selectedOption) {
      return;
    }

    if (this.label === selectedOption.label) {
      return;
    }

    this.label = selectedOption.label;
  }

  private setBadgeValue(newValue: number): void {
    this.badge = { ...this.badge, value: newValue };
  }
}
