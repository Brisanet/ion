import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonBadgeTypes, ButtonIconSizeOptions, Size, Type } from '../core/types/button';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
// import { IonIconComponent } from '../icon/icon.component';

@Component({
  selector: 'ion-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent implements AfterViewChecked {
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
  showDropdownAbove = input(false);
  dropdownConfig = input<Pick<DropdownParams, 'description' | 'notShowClearButton' | 'required' | 'enableSearch'>>({
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
  }

  updateBadgeValue(items: DropdownItem[]): void {
    this.buttonBadge.update(badge => ({ ...badge, value: items.length }));
  }

  handleClick(): void {
    if (!this.loading() && !this.disabled()) {
      this.showDropdown.update(v => !v);
      this.ionOnClick.emit();
    }
  }

  shouldDropdownAbove(): void {
    if (this.showDropdown() && this.showDropdownAbove()) {
      const element = document.getElementById('ion-dropdown');
      const container = document.querySelector('.above') as HTMLElement;
      if (element && container) {
        const elementHeight = element.getBoundingClientRect().height;
        const buttomHeight = 40;
        const movementSize = buttomHeight + elementHeight;
        container.style.top = '-' + movementSize + 'px';
      }
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
    this.showDropdown.set(false);
  }

  onClearBadgeValue(): void {
    this.buttonBadge.update(badge => ({ ...badge, value: 0 }));
  }

  onCloseDropdown(): void {
    if (this.showDropdown()) {
      this.showDropdown.set(false);
    }
  }

  onSearchChange(dropdownSearch: string): void {
    this.handleDropdownSearch.emit(dropdownSearch);
  }

  ngAfterViewChecked(): void {
    this.shouldDropdownAbove();
  }
}
