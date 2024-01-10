import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ButtonIconSizeOptions,
  Type,
  Size,
  ButtonBadgeTypes,
} from '../core/types/button';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';

@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent implements OnInit, OnChanges {
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
}
