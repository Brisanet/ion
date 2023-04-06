import {
  Component,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  OnInit,
  DoCheck,
} from '@angular/core';
import { SafeAny } from './../utils/safe-any';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() disableVisibilityToggle = false;
  @Input() showDropdown = false;
  @Input() placeholder = 'choose';
  @Input() options: DropdownItem[] = [];

  @Output() selected = new EventEmitter<DropdownItem>();

  search = false;
  inputValue = '';
  id: string;

  toggleDropdown(): void {
    if (this.disableVisibilityToggle) {
      this.showDropdown = true;
      return;
    }

    this.showDropdown = !this.showDropdown;
  }

  ngOnInit(): void {
    this.id = this.generateId();

    this.updateLabel();
  }

  generateId = (): string =>
    'ion-select__container-dropdown__' +
    Math.floor(Math.random() * 100000000) +
    1;

  ngAfterViewInit(): void {
    if (this.disableVisibilityToggle) {
      return;
    }

    document.addEventListener('mouseup', (e: SafeAny) => {
      const dropdownContainer = document.getElementById(this.id);
      if (dropdownContainer && !dropdownContainer.contains(e.target)) {
        this.showDropdown = false;
      }
    });
  }

  ngDoCheck(): void {
    this.updateLabel();
  }

  selectedOptions(event: DropdownItem[]): void {
    const [option] = event;
    this.inputValue = option.label;
    this.selected.emit(option);
  }

  uncheckedOptionsInSelect(event: string): void {
    if (!event) {
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

    const hasSelectedOptions = this.options.some(
      (option) => option.selected === true
    );

    if (!hasSelectedOptions) {
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

  clearInput(): void {
    this.inputValue = '';
  }
}
