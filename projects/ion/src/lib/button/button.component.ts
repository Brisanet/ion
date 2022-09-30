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
  @Output() selected = new EventEmitter();

  private defaultLabel?: string = this.label;

  handleClick() {
    if (!this.loading && !this.disabled) {
      this.showDropdown = !this.showDropdown;

      this.ionOnClick.emit();
    }
  }

  handleSelect(items: DropdownItem[]) {
    this.selected.emit(items);

    if (!this.multiple) {
      if (items.length === 0) {
        this.label = this.defaultLabel;

        return;
      }

      const [item] = items;
      this.label = item.label;
    }
  }
}
