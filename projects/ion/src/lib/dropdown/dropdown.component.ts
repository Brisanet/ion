import { SafeAny } from './../utils/safe-any';
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
import { isArray } from 'util';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';

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
  @Input() multiple?: DropdownParams['multiple'] = false;
  @Input() enableSearch = false;
  @Input() searchOptions?: DropdownParams['searchOptions'];
  @Output() selected = new EventEmitter<DropdownItem[]>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearBadgeValue = new EventEmitter();
  @Output() scrollFinal = new EventEmitter();
  @Output() closeDropdown = new EventEmitter<DropdownItem[]>();

  @ViewChild('optionList', { static: false })
  optionList: ElementRef;

  iconSize = 16;

  clearButtonIsVisible: boolean;

  dropdownItens: DropdownItem[] = [];

  setClearButtonIsVisible(): void {
    this.clearButtonIsVisible = !!(
      this.dropdownItens && this.dropdownItens.length
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
    this.dropdownItens = [];
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
    const isSingle = this.isSingle();

    if (this.isDisabled(option)) {
      return;
    }
    if (isSingle) {
      this.clearOptions();
    }
    option.selected = !option.selected;

    if (isSingle) {
      if (isArray(this.dropdownItens)) {
        this.dropdownItens = [];
        this.dropdownItens.push(option);
      }
    } else {
      if (isArray(this.dropdownItens)) {
        if (option.selected) {
          this.dropdownItens.push(option);
        } else {
          const index = this.dropdownItens.findIndex(
            (selectedOption) => selectedOption.label === option.label
          );
          this.dropdownItens.splice(index, 1);
        }
      }
    }

    this.setClearButtonIsVisible();
    this.selected.emit(this.dropdownItens);
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);
  }

  public ngOnInit(): void {
    this.getSelected();
    setTimeout(() => {
      this.setClearButtonIsVisible();
    });
  }

  getSelected(): void {
    this.options.forEach((option) => {
      if (option.selected) {
        this.dropdownItens.push(option);
      }
    });

    if (isArray(this.arraySelecteds)) {
      this.arraySelecteds.forEach((option) => {
        const duplicateOption = this.dropdownItens.find(
          (selectedOption) => selectedOption.label === option.label
        );
        !duplicateOption && this.dropdownItens.push(option);
      });
    }

    this.setSelected();
  }

  public ngOnDestroy(): void {
    this.closeDropdown.emit(this.dropdownItens);
  }

  setSelected(): void {
    if (this.dropdownItens) {
      this.dropdownItens.forEach((selectedOption) => {
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

  public ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes.options && !changes.options.firstChange) {
        this.setSelected();
      }
    }, 200);
  }

  private isDisabled(option: DropdownItem): boolean {
    return option.disabled;
  }

  private isSingle(): boolean {
    return !this.multiple;
  }
}
