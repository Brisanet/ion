import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';

@Component({
  selector: 'ion-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class IonDropdownComponent implements OnInit, AfterViewInit {
  @Input() options: DropdownItem[];
  @Input() multiple?: DropdownParams['multiple'] = false;
  @Input() enableSearch = false;
  @Input() searchOptions?: DropdownParams['searchOptions'];
  @Output() selected = new EventEmitter<DropdownItem[]>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearBadgeValue = new EventEmitter();

  iconSize = 16;

  clearButtonIsVisible: boolean;

  setClearButtonIsVisible(): void {
    this.clearButtonIsVisible = this.options.some(
      (option) => option.selected === true
    );
  }

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
    this.clearButtonIsVisible = false;
    this.clearBadgeValue.emit();
  }

  select(option: DropdownItem): void {
    if (this.isDisabled(option)) {
      return;
    }
    if (this.isSingle()) {
      this.clearOptions();
    }
    option.selected = !option.selected;
    this.setClearButtonIsVisible();
    this.selected.emit(
      this.options.filter((item: DropdownItem) => item.selected)
    );
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);
  }

  public ngOnInit(): void {
    this.setClearButtonIsVisible();
  }

  private isDisabled(option: DropdownItem): boolean {
    return option.disabled;
  }

  private isSingle(): boolean {
    return !this.multiple;
  }
}
