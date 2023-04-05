import {
  Component,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { SafeAny } from './../utils/safe-any';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class IonSelectComponent implements OnInit, AfterViewInit {
  @Input() disabledToggle = false;
  @Input() showDropdown = false;
  @Input() placeholder = 'choose';
  @Input() options: DropdownItem[];
  @Output() selected = new EventEmitter<DropdownItem>();

  search = false;
  inputValue = '';
  id: string;

  toggleDropdown(): void {
    if (this.disabledToggle) {
      this.showDropdown = true;
      return;
    }

    this.showDropdown = !this.showDropdown;
  }

  ngOnInit(): void {
    this.id = this.generateIdentification();
  }

  generateIdentification = (): string =>
    'ion-select__container-dropdown__' +
    Math.floor(Math.random() * 100000000) +
    1;

  ngAfterViewInit(): void {
    if (this.disabledToggle) {
      return;
    }

    document.addEventListener('mouseup', (e: SafeAny) => {
      const dropdownContainer = document.getElementById(this.id);
      if (dropdownContainer && !dropdownContainer.contains(e.target)) {
        this.showDropdown = false;
      }
    });
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
    }
  }

  clearInput(): void {
    this.inputValue = '';
  }
}
