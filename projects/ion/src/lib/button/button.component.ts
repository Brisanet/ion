import { BadgeProps } from './../badge/badge.component';
import { DropdownItem } from './../dropdown/dropdown.component';

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ButtonIconSizeOptions } from '../core/types/button';

import { IconType } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';

type Type = 'primary' | 'secondary' | 'ghost' | 'dashed';
type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface IonButtonProps {
  label?: string;
  type?: Type;
  size?: Size;
  expand?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  multiple?: boolean;
  iconType?: IconType;
  rightSideIcon?: boolean;
  options?: DropdownItem[];
  showDropdown?: boolean;
  circularButton?: boolean;
  selected?: EventEmitter<SafeAny>;
  ionOnClick?: EventEmitter<SafeAny>;
}

type ButtonBadgeTypes = Pick<BadgeProps, 'type' | 'value'>;

@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() label?: string;
  @Input() type?: Type = 'primary';
  @Input() size?: Size = 'md';
  @Input() expand? = false;
  @Input() danger? = false;
  @Input() disabled? = false;
  @Input() loading? = false;
  @Input() loadingMessage = 'Carregando...';
  @Input() multiple? = false;
  @Input() iconType? = '';
  @Input() rightSideIcon? = false;
  @Input() circularButton? = false;
  @Input() options?: DropdownItem[];
  @Input() showDropdown? = false;
  @Output() ionOnClick? = new EventEmitter();
  @Output() selected = new EventEmitter<DropdownItem[]>();

  public buttonBadge?: ButtonBadgeTypes = {
    type: 'secondary',
    value: 0,
  };

  public iconSize!: ButtonIconSizeOptions;

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

    const [item] = selectedItems;
    this.label = item.label;
  }

  ngOnInit(): void {
    this.iconSize = ButtonIconSizeOptions[this.size];
  }
}
