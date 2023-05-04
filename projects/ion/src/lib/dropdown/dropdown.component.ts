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

  @ViewChild('scrollableSection', { static: false })
  scrollableSection: ElementRef;

  iconSize = 16;

  clearButtonIsVisible: boolean;

  selectedArray: DropdownItem[] = [];

  setClearButtonIsVisible(): void {
    this.clearButtonIsVisible = !!(
      this.selectedArray && this.selectedArray.length
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
    console.log(this.selectedArray);
  }

  mouseEnter(option: DropdownItem): void {
    // debugger;
    console.log(this.selectedArray);
    option.selected && !option.disabled && (option.hovered = true);
  }

  mouseLeave(option: DropdownItem): void {
    option.selected && !option.disabled && (option.hovered = false);
  }

  clearOptions(): void {
    this.options.forEach((item: DropdownItem) => {
      item.selected = false;
    });
    // this.selectedArray = [];
    this.clearButtonIsVisible = false;
    this.clearBadgeValue.emit();
  }

  onScroll(): void {
    const scrollableElement = this.scrollableSection.nativeElement;
    const scrollFinal =
      scrollableElement.scrollHeight - scrollableElement.scrollTop ===
      scrollableElement.clientHeight;

    if (scrollFinal) {
      this.scrollFinal.emit();
    }
  }

  select(option: DropdownItem): void {
    console.log(this.selectedArray);
    if (this.isDisabled(option)) {
      return;
    }
    if (this.isSingle()) {
      this.clearOptions();
    }
    option.selected = !option.selected;
    console.log('aqui');

    if (!this.isSingle()) {
      if (option.selected) {
        this.selectedArray.push(option);
      } else {
        const index = this.selectedArray.findIndex(
          (selectedOption) => selectedOption.label === option.label
        );
        this.selectedArray.splice(index, 1);
      }
    }
    console.log('quebrou?');

    console.log(this.selectedArray);

    this.setClearButtonIsVisible();
    this.selected.emit(this.selectedArray);
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);
  }

  public ngOnInit(): void {
    // if (this.arraySelecteds && this.arraySelecteds.length) {
    //   this.setInicialFilter();
    // }
    this.getSelected();
    console.log(this.selectedArray);
  }
  getSelected(): void {
    this.options.forEach((option) => {
      if (option.selected) {
        this.selectedArray.push(option);
      }
    });
    console.log(this.selectedArray);
  }

  // setInicialFilter(): void {
  //   this.selectedArray.concat(this.arraySelecteds);
  //   this.setSelected();
  // }

  public ngOnDestroy(): void {
    this.closeDropdown.emit(this.selectedArray);
  }

  setSelected(): void {
    if (this.selectedArray && this.selectedArray.length) {
      this.selectedArray.forEach((selectedOption) => {
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
