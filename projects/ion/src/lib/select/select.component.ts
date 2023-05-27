import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonSelectProps } from '../core/types/select';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnInit {
  @Input() mode: IonSelectProps['mode'] = 'default';
  @Input() placeholder = '';
  @Input() options: IonSelectProps['options'] = [];
  @Output() events = new EventEmitter<IonSelectProps['options']>();

  showDropdown = false;
  option = '';
  inputValue = '';
  selectedOptions: IonSelectProps['options'] = [];
  copyOptions: IonSelectProps['options'] = [];

  handleClick(event): void {
    this.focusInput(event.target.children);
    this.showDropdown = !this.showDropdown;
  }

  focusInput(children: HTMLElement[]): void {
    for (const element of children) {
      if (element.nodeName === 'INPUT') {
        element.focus();
      }
    }
  }

  ngOnInit(): void {
    this.copyOptions = this.options;
  }

  selected(selectedOptions: IonSelectProps['options']): void {
    this.events.emit(selectedOptions);
    this.inputValue = '';
    this.copyOptions = this.options;

    if (this.mode !== 'multiple') {
      this.standardizeOptions(selectedOptions);
      this.showDropdown = false;
      return;
    }

    this.selectedOptions = this.options.filter((option) => option.selected);
  }

  standardizeOptions(selectedOptions: IonSelectProps['options']): void {
    this.unselectAllOptions();

    if (selectedOptions.length) {
      const [optionSelected] = this.options.filter(
        (option) => option.label === selectedOptions[0].label
      );
      optionSelected.selected = true;
      this.option = optionSelected.label;
      return;
    }
    this.option = '';
  }

  clearSelectedOptions(): void {
    this.selectedOptions = [];
    this.inputValue = '';
    this.option = '';
    this.unselectAllOptions();
  }

  unselectAllOptions(): void {
    this.options.forEach((option) => (option.selected = false));
  }

  unselect(unselectOption: DropdownItem): void {
    const item = this.options.find(
      (option) => option.label === unselectOption.label
    );

    item.selected = false;

    this.selectedOptions = this.selectedOptions.filter(
      (option) => option.label !== unselectOption.label
    );
  }

  onSearchChange(): void {
    this.showDropdown = true;
    if (!this.inputValue) {
      this.copyOptions = this.options;
    }

    this.copyOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(this.inputValue.toLowerCase())
    );
  }

  onCloseDropdown(): void {
    if (this.showDropdown) {
      this.showDropdown = false;
    }
  }
}
