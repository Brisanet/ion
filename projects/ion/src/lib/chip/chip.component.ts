import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  input,
  output,
  effect,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon/icon.component';
import { IonBadgeComponent } from '../badge/badge.component';
import { IonInfoBadgeComponent } from '../info-badge/info-badge.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import {
  BadgeType,
  DropdownItem,
  DropdownParams,
  IconType,
  InfoBadgeStatus,
} from '../core/types';

export type ChipSize = 'sm' | 'md';
export type IconDirection = 'right' | 'left';

interface ChipEvent {
  selected: boolean;
  disabled: boolean;
  closeDropdown?: boolean;
}

export interface IonChipProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  size?: ChipSize;
  options?: DropdownItem[];
  icon?: string;
  multiple?: boolean;
  infoBadge?: InfoBadgeStatus;
  iconPosition?: IconDirection;
  rightBadge?: RightBadge;
  showToggle?: boolean;
  dropdownSearchConfig?: Pick<DropdownParams, 'searchOptions' | 'enableSearch'>;
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
  imports: [
    CommonModule,
    IonIconComponent,
    IonBadgeComponent,
    IonInfoBadgeComponent,
    IonDropdownComponent,
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonChipComponent {
  // Inputs
  label = input.required<string>();
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
  size = input<ChipSize>('sm');
  icon = input<IconType | undefined>(undefined);
  options = input<DropdownItem[]>([]);
  multiple = input<boolean>(false);
  infoBadge = input<InfoBadgeStatus | undefined>(undefined);
  iconPosition = input<IconDirection>('left');
  rightBadge = input<RightBadge | undefined>(undefined);
  showToggle = input<boolean>(false);
  required = input<boolean>(false);
  chipGroup = input<boolean>(false);
  chipGroupRequired = input<boolean>(false);
  dropdownSearchConfig = input<IonChipProps['dropdownSearchConfig']>(undefined);

  // Outputs
  events = output<ChipEvent>();
  dropdownEvents = output<DropdownItem[]>();
  dropdownSearchEvents = output<string>();

  // Internal state
  showDropdown = model<boolean>(false);
  internalSelected = signal<boolean>(false);
  badge = signal<Badge>({ value: 0 });
  placeholder = signal<string>('');
  iconPlaceholder = signal<IconType | undefined>(undefined);
  dropdownWithIcon = signal<boolean>(false);
  chipId = signal<string>('');
  dropdownId = signal<string>('');

  // Computed values
  selectedOptions = computed(() => {
    return (this.options() || []).filter((option) => option.selected);
  });

  displaySelected = computed(() => {
    return this.internalSelected() || this.selected();
  });

  constructor() {
    // Initialize IDs
    this.chipId.set(this.generateId('ion-chip__container-'));
    this.dropdownId.set(this.generateId('ion-chip__container-dropdown-'));

    // Initialize placeholder
    effect(() => {
      this.updateLabel();
    });

    // Update badge value when options change
    effect(() => {
      const selecteds = this.selectedOptions();
      if (this.multiple() && selecteds.length > 0) {
        this.badge.set({ value: selecteds.length });
      }
    });

    // Update dropdown with icon flag
    effect(() => {
      const opts = this.options();
      if (opts && opts.length > 0 && opts[0].icon) {
        this.dropdownWithIcon.set(true);
      } else {
        this.dropdownWithIcon.set(false);
      }
    });
  }

  select(): void {
    this.toggleDropdown();

    if (
      (!this.options().length &&
        this.chipGroup() &&
        !this.chipGroupRequired()) ||
      !this.chipGroup()
    ) {
      this.internalSelected.update((val) => !val);
    }

    this.events.emit({
      selected: this.displaySelected(),
      disabled: this.disabled(),
    });
  }

  toggleDropdown(): void {
    if (this.showToggle()) {
      this.showDropdown.set(true);
      return;
    }

    if (this.options().length > 0) {
      this.showDropdown.update((val: boolean) => !val);
    }
  }

  clearBadgeValue(): void {
    this.setBadgeValue(0);
  }

  selectDropdownItem(selecteds: DropdownItem[]): void {
    this.dropdownEvents.emit(selecteds);
    if (selecteds.length) {
      if (this.multiple()) {
        this.setBadgeValue(selecteds.length);
        return;
      }
      this.setPlaceHolder(selecteds[0].label, selecteds[0].icon);
    } else {
      this.clearBadgeValue();
      this.updateLabel();
    }
  }

  setPlaceHolder(label: string, icon: IconType | undefined): void {
    this.placeholder.set(label || this.label());
    this.iconPlaceholder.set(icon || this.icon());
    this.internalSelected.set(false);
    this.toggleDropdown();
  }

  dropdownSearchChange(value: string): void {
    this.dropdownSearchEvents.emit(value);
  }

  closeDropdown(): void {
    if (this.showDropdown()) {
      this.showDropdown.set(false);
      this.internalSelected.set(false);

      this.events.emit({
        selected: this.displaySelected(),
        disabled: this.disabled(),
        closeDropdown: true,
      });
    }
  }

  private generateId = (name: string): string =>
    name + Math.floor(Math.random() * 100000000) + 1;

  private setBadgeValue(newValue: number): void {
    this.badge.set({ value: newValue });
  }

  private updateLabel(): void {
    const opts = this.options();
    this.placeholder.set(this.label());
    this.iconPlaceholder.set(undefined);
    if (
      this.multiple() ||
      !opts ||
      opts.length === 0 ||
      opts.every((o) => !o.selected)
    ) {
      return;
    }

    const selectedOption = opts.find((option) => option.selected);

    if (selectedOption) {
      this.placeholder.set(selectedOption.label);
      this.iconPlaceholder.set(selectedOption.icon);
    }
  }
}
