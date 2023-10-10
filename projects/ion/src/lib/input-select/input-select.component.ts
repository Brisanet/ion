import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption, ValueToEmmit } from '../core/types/input-select';

const defaultSelectOptions: SelectOption[] = [
  {
    label: 'Maior que',
  },
  {
    label: 'Entre',
    multiple: true,
    firstPlaceholder: 'Valor inicial',
    secondPlaceholder: 'Valor final',
  },
  {
    label: 'Igual a',
  },
  {
    label: 'Maior ou igual a',
  },
  {
    label: 'Menor que',
  },
  {
    label: 'Menor ou igual a',
  },
];

@Component({
  selector: 'ion-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class IonInputSelectComponent implements OnInit {
  @Input() name?: string;
  @Input() disabled = false;
  @Input() value = '';
  @Input() secondValue = '';
  @Input() selectOptions: SelectOption[] = defaultSelectOptions;
  @Output() valueChange = new EventEmitter<ValueToEmmit>();

  public dropdownVisible = false;
  public currentOption!: SelectOption;

  public handleSelect(selectedOption: SelectOption[]): void {
    this.currentOption = selectedOption[0];
    this.toggleDropdownVisibility();
  }

  public handleClick(): void {
    this.toggleDropdownVisibility();
  }

  public handleChange(): void {
    this.valueChange.emit({
      optionSelected: this.currentOption,
      inputValue: this.value,
      secondValue: this.secondValue,
    });
  }

  public onClickOutside(): void {
    this.dropdownVisible = false;
  }

  ngOnInit(): void {
    if (!this.getCurrentOption()) {
      this.selectOptions[0].selected = true;
    }

    this.currentOption = this.getCurrentOption();
  }

  private toggleDropdownVisibility(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  private getCurrentOption(): SelectOption {
    return this.selectOptions.filter((option) => option.selected)[0];
  }
}
