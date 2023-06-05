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
  @Input() selectedMaxLength: DropdownParams['selectedMaxLength'];
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

    this.clearButtonIsVisible = showClearButton && hasItems && !this.required;
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
    this.clearBadgeValue.emit();
  }

  clearOptions(): void {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
    this.dropdownSelectedItens = [];
    this.clearButtonIsVisible = false;
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
    if (this.dropdownSelectedItens) {
      if (!option.selected) {
        if (
          this.selectedMaxLength &&
          this.dropdownSelectedItens.length === this.selectedMaxLength
        ) {
          return;
        }
        option.selected = true;
        this.dropdownSelectedItens.push(option);
      } else {
        option.selected = false;
        const index = this.dropdownSelectedItens.findIndex(
          (selectedOption) => selectedOption.label === option.label
        );
        this.dropdownSelectedItens.splice(index, 1);
      }
    }
    this.emitSelectedOptions();
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
    this.getSelected();
    setTimeout(() => {
      this.setClearButtonIsVisible();
    });
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
