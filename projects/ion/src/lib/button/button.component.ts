import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ButtonBadgeTypes,
  ButtonIconSizeOptions,
  Size,
  Type,
} from '../core/types/button';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { IonIconComponent } from '../icon/icon.component';
import { IconType } from '../core/types/icon';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { IonBadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'ion-button',
  standalone: true,
  imports: [
    CommonModule,
    IonIconComponent,
    IonDropdownComponent,
    IonBadgeComponent,
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent {
  label = input<string>();
  tooltip = input<string>();
  type = input<Type>('primary');
  size = input<Size>('md');
  expand = input(false);
  danger = input(false);
  disabled = input(false);
  loading = input(false);
  loadingMessage = input<string>();
  multiple = input(false);
  iconType = input('');
  rightSideIcon = input(false);
  circularButton = input(false);
  options = input<DropdownItem[]>();
  showDropdownInput = input(false, { alias: 'showDropdown' });
  showDropdownAbove = input(false, { alias: 'showDropdownAbove' });
  dropdownConfig = input<
    Pick<
      DropdownParams,
      | 'description'
      | 'notShowClearButton'
      | 'required'
      | 'enableSearch'
      | 'searchOptions'
    >
  >({
    notShowClearButton: false,
    required: false,
  });
  id = input<string>();

  ionOnClick = output<void>();
  selected = output<DropdownItem[]>();
  handleDropdownSearch = output<string>();

  public buttonBadge = signal<ButtonBadgeTypes>({
    type: 'secondary',
    value: 0,
  });

  public showDropdown = signal(false);
  public _label = signal<string | undefined>(undefined);

  // Computed
  public iconSize = computed(() => ButtonIconSizeOptions[this.size()]);

  constructor() {
    effect(() => {
      this._label.set(this.label());
    });

    effect(() => {
      this.showDropdown.set(this.showDropdownInput());
    });
  }

  updateBadgeValue(items: DropdownItem[]): void {
    this.buttonBadge.update((badge) => ({ ...badge, value: items.length }));
  }

  handleClick(): void {
    if (!this.loading() && !this.disabled()) {
      this.showDropdown.update((v) => !v);
      this.ionOnClick.emit();
    }
  }

  handleSelect(selectedItems: DropdownItem[]): void {
    this.selected.emit(selectedItems);

    if (this.multiple()) {
      this.updateBadgeValue(selectedItems);
      return;
    }

    if (!selectedItems.length) {
      this._label.set(this.label());
      return;
    }

    const [item] = selectedItems;
    this._label.set(item.label);
    if (!this.multiple()) {
      this.showDropdown.set(false);
    }
  }

  onClearBadgeValue(): void {
    this.buttonBadge.update((badge) => ({ ...badge, value: 0 }));
  }

  onCloseDropdown(): void {
    if (this.showDropdown()) {
      this.showDropdown.set(false);
    }
  }

  onSearchChange(dropdownSearch: string): void {
    this.handleDropdownSearch.emit(dropdownSearch);
  }
}
