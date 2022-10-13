import { BadgeProps } from './../badge/badge.component';
import { DropdownItem } from './../dropdown/dropdown.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class ButtonComponent {
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

  updateBadgeValue(items: DropdownItem[]) {
    this.buttonBadge.value = items.length;
  }

  handleClick() {
    if (!this.loading && !this.disabled) {
      this.showDropdown = !this.showDropdown;

      this.ionOnClick.emit();
    }
  }

  handleSelect(selecteds: DropdownItem[]) {
    this.selected.emit(selecteds);

    if (this.multiple) {
      this.updateBadgeValue(selecteds);
      return;
    }

    const [item] = selecteds;
    this.label = item.label;
  }
}
