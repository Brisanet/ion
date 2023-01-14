import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonInputProps } from '../input/input.component';

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
  enableSearch?: boolean;
  searchOptions?: IonInputProps;
  searchChange?: EventEmitter<string>;
}

@Component({
  selector: 'ion-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements AfterViewInit {
  @Input() options: DropdownItem[];
  @Input() multiple?: DropdownParams['multiple'] = false;
  @Input() enableSearch = false;
  @Input() searchOptions?: DropdownParams['searchOptions'];
  @Output() selected = new EventEmitter<DropdownItem[]>();
  @Output() searchChange = new EventEmitter<string>();

  iconSize = 16;

  clearSelectedOp = false;

  public ngAfterViewInit(): void {
    const widthContainer = window.innerWidth;
    const element = document.getElementById('ion-dropdown');
    const elementProps = element.getBoundingClientRect();
    const elementRight = elementProps.right;
    elementRight > widthContainer && (element.style.right = '0');

    const heightContainer = window.innerHeight;
    const elementBottom = elementProps.bottom;
    elementBottom > heightContainer && (element.style.bottom = '42px');
  }

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
    this.clearSelectedOp = !this.clearSelectedOp;
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
    this.clearSelectedOp = true;
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);
  }

  private isDisabled(option: DropdownItem): boolean {
    return option.disabled;
  }

  private isSingle(): boolean {
    return !this.multiple;
  }
}
