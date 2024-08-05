import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { SafeAny } from '../utils/safe-any';

export const COLDOWN = 200;

@Component({
  selector: 'ion-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class IonDropdownComponent
  implements OnInit, AfterViewChecked, OnChanges, OnDestroy
{
  @Input() description: DropdownParams['description'];
  @Input() options: DropdownParams['options'] = [];
  @Input() maxSelected: DropdownParams['maxSelected'];
  @Input() multiple: DropdownParams['multiple'] = false;
  @Input() required: DropdownParams['required'] = false;
  @Input() loading: DropdownParams['loading'] = false;
  @Input() enableSearch: DropdownParams['enableSearch'] = false;
  @Input() searchOptions: DropdownParams['searchOptions'];
  @Input() notShowClearButton: DropdownParams['notShowClearButton'] = false;
  @Input() noDataConfig: DropdownParams['noDataConfig'] = {
    label: 'Não há dados',
    iconType: 'exclamation-rounded',
  };
  @Input() propLabel: DropdownParams['propLabel'] = 'label';
  @Output() selected = new EventEmitter<DropdownItem[]>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearBadgeValue = new EventEmitter();
  @Output() scrollFinal = new EventEmitter();
  @Output() closeDropdown = new EventEmitter();
  @Output() clearButton = new EventEmitter();

  @ViewChild('optionList', { static: false })
  optionList: ElementRef;

  iconSize = 16;

  clearButtonIsVisible: boolean;

  dropdownSelectedItems: Array<DropdownItem> = [];

  canDeselect = true;

  setClearButtonIsVisible(): void {
    const hasItemsSelected = this.checkArray(this.dropdownSelectedItems);
    const showClearButton = !this.notShowClearButton;

    this.clearButtonIsVisible =
      hasItemsSelected &&
      this.multiple &&
      showClearButton &&
      !this.required &&
      !this.loading;
  }

  public ngAfterViewChecked(): void {
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

  clearEvent(): void {
    this.clearOptions();
    if (!this.multiple && !this.required) {
      this.selected.emit(this.dropdownSelectedItems);
    }
  }

  clearOptions(isClearButton = false): void {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
    this.dropdownSelectedItems = [];
    this.clearButtonIsVisible = false;
    if (isClearButton) {
      this.selected.emit([]);
      this.clearButton.emit();
    }
  }

  optionsScroll(): void {
    const scrollableElement = this.optionList.nativeElement;

    const scrollFinal =
      scrollableElement.scrollHeight - scrollableElement.scrollTop ===
      scrollableElement.clientHeight;

    if (scrollFinal) {
      this.scrollFinal.emit();
    }
  }

  select(option: DropdownItem): void {
    if (option.disabled) {
      return;
    }

    if (this.multiple) {
      this.manageMultipleOptions(option);
      return;
    }

    if (!option.selected) {
      this.selectSingleOption(option);
      return;
    }

    if (!this.required) {
      this.clearEvent();
    }
  }

  selectSingleOption(option: DropdownItem): void {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
    option.selected = true;
    this.clearButtonIsVisible = false;
    this.updateSelectedItems();
  }

  manageMultipleOptions(option: DropdownItem): void {
    if (!option.selected && this.isAtSelectedsMaxLength()) {
      return;
    }

    if (!option.selected || (option.selected && this.canDeselect)) {
      option.selected = !option.selected;
    }

    if (this.dropdownSelectedItems.length === 0) {
      this.clearBadgeValue.emit();
    }
    this.updateSelectedItems();
  }

  isAtSelectedsMaxLength(): boolean {
    const selectedOptions = this.options.filter((option) => option.selected);
    return this.maxSelected && selectedOptions.length === this.maxSelected;
  }

  emitSelectedOptions(): void {
    this.selected.emit(this.dropdownSelectedItems);
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);
  }

  updateSelectedItems(emit = true): void {
    this.dropdownSelectedItems = [];
    if (this.checkArray(this.options)) {
      this.dropdownSelectedItems = this.options.filter(
        (option) => option.selected
      );
    }
    this.updateCanDeselectItem();
    this.setClearButtonIsVisible();
    if (emit) {
      this.emitSelectedOptions();
    }
  }

  updateCanDeselectItem(): void {
    const isSingleSelectionAllowed = !this.multiple && !this.required;
    const isMultipleSelectionAllowed =
      this.multiple &&
      (!this.required ||
        (this.required && this.dropdownSelectedItems.length > 1));

    this.canDeselect = isSingleSelectionAllowed || isMultipleSelectionAllowed;
  }

  clickedOutsideDropdown(): void {
    this.closeDropdown.emit(this.dropdownSelectedItems);
  }

  public ngOnInit(): void {
    this.updateSelectedItems(false);
  }

  public ngOnDestroy(): void {
    this.closeDropdown.emit(this.dropdownSelectedItems);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes.options && !changes.options.firstChange) {
        this.updateSelectedItems(false);
      }
    }, COLDOWN);
    this.setClearButtonIsVisible();
    this.updateCanDeselectItem();
  }

  private checkArray(array: Array<SafeAny>): boolean {
    return array && array.length > 0;
  }
}
