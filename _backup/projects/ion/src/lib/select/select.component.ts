import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonSelectProps } from '../core/types/select';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnChanges {
  @ViewChild('ionSelectInput', { static: true }) ionSelectInput;
  @Input() mode: IonSelectProps['mode'] = 'default';
  @Input() placeholder = '';
  @Input() options: IonSelectProps['options'] = [];
  @Input() maxSelected?: IonSelectProps['maxSelected'];
  @Input() required: IonSelectProps['required'] = false;
  @Input() loading: IonSelectProps['loading'] = false;
  @Input() disabled: IonSelectProps['disabled'] = false;
  @Input() propLabel: IonSelectProps['propLabel'] = 'label';
  @Output() events = new EventEmitter<IonSelectProps['options']>();
  @Output() search = new EventEmitter<string>();

  showDropdown = false;
  inputValue = '';
  visibleOptions: IonSelectProps['options'] = [];
  showPlaceholder = true;
  private touched = false;
  private hasValue = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.visibleOptions = this.options;
    }
  }

  handleClick(): void {
    if (this.disabled) {
      return;
    }
    this.focusInput();
    this.showDropdown = !this.showDropdown;
  }

  focusInput(): void {
    this.ionSelectInput.nativeElement.focus();
  }

  selected(selectedOptions: IonSelectProps['options']): void {
    this.events.emit(selectedOptions);
    this.inputValue = '';
    this.visibleOptions = this.options;
    if (this.mode === 'default') {
      this.unselectAllOptions();
      const [option] = selectedOptions;
      if (option) {
        option.selected = true;
        this.showDropdown = false;
      }
    }
    this.hasValue = !!selectedOptions.length;
  }

  hasSelectedOption = (): boolean => {
    return this.options.some((option) => !!option.selected);
  };

  unselectAllOptions(): void {
    this.options.forEach((option) => (option.selected = false));
  }

  unselectOption(currentOption: DropdownItem): void {
    currentOption.selected = false;
    this.events.emit(this.options.filter((option) => option.selected));
    event.stopPropagation();
    this.hasValue = this.mode === 'default' ? false : this.hasSelectedOption();
  }

  onSearchChange(): void {
    this.showDropdown = true;

    this.visibleOptions = this.options.filter((option) => {
      return option[this.propLabel]
        .toLowerCase()
        .includes(this.inputValue.toLowerCase());
    });

    this.search.emit(this.inputValue);
  }

  @HostBinding('class.ion-select__required')
  get isValid(): boolean {
    if (!this.required) {
      return false;
    }
    return this.touched && !this.hasValue;
  }

  onCloseDropdown(): void {
    if (this.showDropdown) {
      this.showDropdown = false;
      this.touched = true;
    }
    this.inputValue = '';
    this.visibleOptions = this.options;
  }
}
