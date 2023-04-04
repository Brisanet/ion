import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent implements OnInit, OnChanges {
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

  public id: string;

  badge: Badge = {
    value: 0,
  };

  previusSelectedStatus = false;

  clickReference!: SafeAny;

  constructor(private ref: ChangeDetectorRef) {
    this.ref.markForCheck();
  }

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

  ngOnInit(): void {
    if (this.multiple) {
      return;
    }

    const [selectedOption] = this.getSelectedOptions();

    if (!selectedOption) {
      return;
    }

    this.label = selectedOption.label;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && !changes.options.firstChange && !this.multiple) {
      const filtroSelection = changes.options.currentValue.filter(
        (option: DropdownItem) => option.selected
      );
      this.label = filtroSelection[0].label;
    }
  }

  getSelectedOptions(): DropdownItem[] {
    return (this.options || []).filter((option) => option.selected);
  }
}
