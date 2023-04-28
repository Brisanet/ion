import {
  Component,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  OnInit,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent
  implements OnInit, AfterViewInit, DoCheck, OnDestroy
{
  @Input() showToggle = false;
  @Input() showDropdown = false;
  @Input() placeholder = 'Choose a option';
  @Input() options: DropdownItem[] = [];
  @Input() enableSearch = true;
  @Input() enableFilteringOptions = true;

  @Output() selected = new EventEmitter<DropdownItem>();
  @Output() searchChange = new EventEmitter<string>();

  inputValue = '';
  inputId: string;
  dropdownId: string;
  optionsCopy: DropdownItem[] = [];

  toggleDropdown(): void {
    if (this.showToggle) {
      this.showDropdown = true;
      return;
    }

    this.showDropdown = !this.showDropdown;
    this.optionsCopy = this.options;
  }

  ngOnInit(): void {
    this.updateLabel();
    this.inputId = this.generateId('ion-select__input-container-');
    this.dropdownId = this.generateId('ion-select__dropdown-container-');
    this.optionsCopy = this.options;
  }

  generateId = (name: string): string =>
    name + Math.floor(Math.random() * 100000000) + 1;

  closeDropdown(event: MouseEvent): void {
    const element = event.target as HTMLElement;

    if (element.nodeName === 'path') {
      return;
    }

    const chipContainer = document.getElementById(this.inputId);
    if (chipContainer && chipContainer.contains(element)) {
      return;
    }

    const dropdownContainer = document.getElementById(this.dropdownId);
    if (dropdownContainer && !dropdownContainer.contains(element)) {
      this.showDropdown = false;
      this.optionsCopy = this.options;
    }
  }

  ngAfterViewInit(): void {
    if (this.showToggle) {
      return;
    }

    document.addEventListener('click', (e) => this.closeDropdown(e));
  }

  ngDoCheck(): void {
    this.updateLabel();
  }

  selectedOptions(event: DropdownItem[]): void {
    const [option] = event;
    this.inputValue = option.label;
    this.selected.emit(option);

    this.options.forEach((currentOption) => {
      currentOption.selected = currentOption.label === option.label;
    });
    this.showDropdown = false;
  }

  uncheckedOptionsInSelect(value: string): void {
    if (!value) {
      this.options.forEach((item: DropdownItem) => {
        item.selected = false;
      });

      this.clearInput();
    }
  }

  updateLabel(): void {
    if (!this.options || (this.options && this.options.length === 0)) {
      return;
    }

    if (!this.hasSelectedOptions()) {
      return;
    }

    const [{ label }] = this.options.filter(
      (option) => option.selected === true
    );

    if (this.inputValue === label) {
      return;
    }

    this.inputValue = label;
  }

  hasSelectedOptions = (): boolean =>
    this.options.some((option) => option.selected === true);

  clearInput(): void {
    this.inputValue = '';
  }

  inputChange(value: string): void {
    this.searchChange.emit(value);

    if (this.enableFilteringOptions) {
      this.filterOptions(value);
    }
  }

  filterOptions(term: string): void {
    if (!term) {
      this.optionsCopy = this.options;
      return;
    }

    this.optionsCopy = this.options.filter((item) =>
      item.label.toLowerCase().includes(term.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeDropdown);
  }
}
