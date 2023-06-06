import {
  AfterViewInit,
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
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() options: DropdownItem[] = [];
  @Input() arraySelecteds: DropdownItem[] = [];
  @Input() maxSelecteds?: DropdownParams['maxSelecteds'];
  @Input() multiple?: DropdownParams['multiple'] = false;
  @Input() required?: DropdownParams['required'] = false;
  @Input() enableSearch = false;
  @Input() searchOptions?: DropdownParams['searchOptions'];
  @Input() notShowClearButton?: DropdownParams['notShowClearButton'] = false;
  @Output() selected = new EventEmitter<DropdownItem[]>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearBadgeValue = new EventEmitter();
  @Output() scrollFinal = new EventEmitter();
  @Output() closeDropdown = new EventEmitter<DropdownItem[]>();

  @ViewChild('optionList', { static: false })
  optionList: ElementRef;

  iconSize = 16;

  clearButtonIsVisible: boolean;

  dropdownSelectedItens: Array<DropdownItem> = [];

  setClearButtonIsVisible(): void {
    const hasItems = this.checkArray(this.dropdownSelectedItens);
    const showClearButton = !this.notShowClearButton;
    if (this.multiple) {
      this.clearButtonIsVisible = showClearButton && hasItems && !this.required;
    }
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

  clearEvent(): void {
    this.clearOptions();
    if (!this.multiple && !this.required) {
      this.selected.emit(this.dropdownSelectedItens);
    }
  }

  clearOptions(): void {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
    this.dropdownSelectedItens = [];
    this.clearButtonIsVisible = false;
    this.clearBadgeValue.emit();
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
      if (!option.selected && this.isAtSelectedsMaxLength()) {
        return;
      }
      this.manageMultipleOptions(option);
      this.emitSelectedOptions();
      return;
    }
    if (!option.selected) {
      this.selectSingleOption(option);
      return;
    }
    if (this.required) {
      return;
    }
    this.clearEvent();
  }

  selectSingleOption(option: DropdownItem): void {
    this.clearOptions();
    option.selected = true;
    this.dropdownSelectedItens = [option];
    this.emitSelectedOptions();
  }

  manageMultipleOptions(option: DropdownItem): void {
    option.selected = !option.selected;

    if (option.selected) {
      this.dropdownSelectedItens.push(option);
      return;
    }

    const index = this.dropdownSelectedItens.findIndex(
      (selectedOption) => selectedOption.label === option.label
    );
    this.dropdownSelectedItens.splice(index, 1);
  }

  isAtSelectedsMaxLength(): boolean {
    const selectedOptions = this.options.filter((option) => option.selected);
    return this.maxSelecteds && selectedOptions.length === this.maxSelecteds;
  }

  emitSelectedOptions(): void {
    this.setClearButtonIsVisible();
    this.selected.emit(this.dropdownSelectedItens);
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);
  }

  public ngOnInit(): void {
    if (this.multiple) {
      this.required = false;
    }
    setTimeout(() => {
      this.setClearButtonIsVisible();
    });
    this.getSelected();
  }

  getSelected(): void {
    this.options.forEach((option) => {
      if (option.selected) {
        this.dropdownSelectedItens.push(option);
      }
    });

    if (this.checkArray(this.arraySelecteds)) {
      this.arraySelecteds.forEach((option) => {
        const duplicateOption = this.dropdownSelectedItens.find(
          (selectedOption) => selectedOption.label === option.label
        );
        !duplicateOption && this.dropdownSelectedItens.push(option);
      });
    }

    this.setSelected();
  }

  public ngOnDestroy(): void {
    this.closeDropdown.emit(this.dropdownSelectedItens);
  }

  setSelected(): void {
    if (this.checkArray(this.dropdownSelectedItens)) {
      this.dropdownSelectedItens.forEach((selectedOption) => {
        const option = this.options.find(
          (option) => option.label === selectedOption.label
        );

        if (option) {
          option.selected = true;
        }
      });
    }

    this.setClearButtonIsVisible();
  }

  clickedOutsideDropdown(): void {
    this.closeDropdown.emit(this.dropdownSelectedItens);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes.options && !changes.options.firstChange) {
        this.setSelected();
      }
    }, COLDOWN);
  }

  private checkArray(array: Array<SafeAny>): boolean {
    return array && array.length > 0;
  }
}
