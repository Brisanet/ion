import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ButtonBadgeTypes,
  ButtonIconSizeOptions,
  Size,
  Type,
} from '../core/types/button';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';

@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() label?: string;
  @Input() tooltip?: string;
  @Input() type?: Type = 'primary';
  @Input() size?: Size = 'md';
  @Input() expand? = false;
  @Input() danger? = false;
  @Input() disabled? = false;
  @Input() loading? = false;
  @Input() loadingMessage?: string;
  @Input() multiple? = false;
  @Input() iconType? = '';
  @Input() rightSideIcon? = false;
  @Input() circularButton? = false;
  @Input() options?: DropdownItem[];
  @Input() showDropdown? = false;
  @Input() showDropdownAbove? = false;
  @Input() dropdownConfig?: Pick<
    DropdownParams,
    'description' | 'notShowClearButton' | 'required' | 'enableSearch'
  > = {
    notShowClearButton: false,
    required: false,
  };
  @Input() id?: string;

  @Output() ionOnClick? = new EventEmitter();
  @Output() selected = new EventEmitter<DropdownItem[]>();
  @Output() handleDropdownSearch = new EventEmitter<string>();

  public buttonBadge?: ButtonBadgeTypes = {
    type: 'secondary',
    value: 0,
  };

  public iconSize!: ButtonIconSizeOptions;

  private originalConfig = {
    label: '',
  };

  updateBadgeValue(items: DropdownItem[]): void {
    this.buttonBadge.value = items.length;
  }

  handleClick(): void {
    if (!this.loading && !this.disabled) {
      this.showDropdown = !this.showDropdown;

      this.ionOnClick.emit();
    }
  }

  shouldDropdownAbove(): void {
    if (this.showDropdown && this.showDropdownAbove) {
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

    if (this.multiple) {
      this.updateBadgeValue(selectedItems);
      return;
    }

    if (!selectedItems.length) {
      this.label = this.originalConfig.label;
      return;
    }

    const [item] = selectedItems;
    this.label = item.label;

    this.showDropdown = false;
  }

  onClearBadgeValue(): void {
    this.buttonBadge.value = 0;
  }

  onCloseDropdown(): void {
    if (this.showDropdown) {
      this.showDropdown = false;
    }
  }

  onSearchChange(dropdownSearch: string): void {
    this.handleDropdownSearch.emit(dropdownSearch);
  }

  ngOnInit(): void {
    this.iconSize = ButtonIconSizeOptions[this.size];
    this.originalConfig = { label: this.label };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled && changes.disabled.currentValue) {
      this.loading = false;
    }
  }

  ngAfterViewChecked(): void {
    this.shouldDropdownAbove();
  }
}
