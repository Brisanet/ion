import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { BadgeType } from '../badge/badge.component';
import { InfoBadgeStatus } from '../core/types';
import { DropdownItem, DropdownParams } from '../dropdown/dropdown.component';
import { generateIDs } from '../utils';
import { IconType } from './../icon/icon.component';

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
export class ChipComponent implements AfterViewInit, OnDestroy {
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

  checkTargetClick = (event): void => {
    if (event.target instanceof EventTarget) {
      const target = event.target as HTMLInputElement;
      const elementChip = target.closest('#' + this.id);
      const elementChipDropdown = target.closest('#dropdown-' + this.id);
      const elementChipSearch = target.closest(
        '#dropdown-' + this.id + ' .dropdown-search'
      );

      if (elementChipSearch || (elementChipDropdown && this.multiple)) {
        return;
      }

      if (!elementChip) {
        if ((this.previusSelectedStatus && this.selected) || !this.selected) {
          this.showDropdown = false;
          this.selected = false;
          this.events.emit({
            selected: this.selected,
            disabled: this.disabled,
          });
          this.ref.detectChanges();
        }
      }
      this.previusSelectedStatus = this.selected;
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.id = generateIDs('chip-', 'ion-chip');
      this.ref.markForCheck();
    }, 400);

    document.body.addEventListener('click', this.checkTargetClick);
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.checkTargetClick);
  }
}
