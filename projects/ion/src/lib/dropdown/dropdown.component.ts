import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DropdownItem {
  label: string;
  key?: string;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
}

export interface DropdownParams {
  options: DropdownItem[];
  selected: EventEmitter<DropdownItem[]>;
  multiple?: boolean;
}

@Component({
  selector: 'ion-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options: DropdownItem[];
  @Input() multiple?: DropdownParams['multiple'] = false;
  @Output() selected = new EventEmitter<DropdownItem[]>();

  iconSize = 16;

  mouseEnter(option: DropdownItem): void {
    option.selected && !option.disabled && (option.hovered = true);
  }

  mouseLeave(option: DropdownItem): void {
    option.selected && !option.disabled && (option.hovered = false);
  }

  clearOptions(): void {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
  }

  select(option: DropdownItem): void {
    if (this.isDisabled(option)) {
      return;
    }
    if (this.isSingle()) {
      this.clearOptions();
    }
    option.selected = !option.selected;
    this.selected.emit(
      this.options.filter((item: DropdownItem) => item.selected)
    );
  }

  private isDisabled(option: DropdownItem): boolean {
    return option.disabled;
  }

  private isSingle(): boolean {
    return !this.multiple;
  }
}
