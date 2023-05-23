import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonSelectProps } from '../core/types/select';
import { DropdownItem } from '../core/types';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ionSelect', { static: false })
  ionSelect!: ElementRef<HTMLElement>;
  @ViewChild('ionDropdown', { static: false })
  ionDropdown;
  @Input() mode: IonSelectProps['mode'] = 'multiple';
  @Input() placeholder = '';
  @Input() options: IonSelectProps['options'] = [];
  @Output() events = new EventEmitter<IonSelectProps['options']>();

  showDropdown = false;
  option = '';
  inputValue = '';
  selectedOptions: IonSelectProps['options'] = [];
  copyOptions: IonSelectProps['options'] = [];

  onSelect(event): void {
    const eventNodeName = event.target.attributes[0].nodeName;
    const ionSelectNodeName =
      this.ionSelect.nativeElement.attributes[0].nodeName;

    if (eventNodeName === ionSelectNodeName) {
      this.focusInput(event.target.children);
    }
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

  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => this.closeDropdown(e));
  }

  closeDropdown(event: MouseEvent): void {
    if (!this.showDropdown) {
      return;
    }

    const element = event.target as HTMLElement;

    if (this.ionSelect.nativeElement.contains(element)) {
      return;
    }

    if (!this.ionDropdown.optionList.nativeElement.contains(element)) {
      this.showDropdown = false;
    }
  }

  selected(selectedOptions: IonSelectProps['options']): void {
    this.events.emit(selectedOptions);
    this.inputValue = '';
    this.copyOptions = this.options;

    if (this.mode !== 'multiple') {
      this.standardizeOptions(selectedOptions);
      this.option = selectedOptions.length > 0 ? selectedOptions[0].label : '';
      this.showDropdown = false;
      return;
    }

    this.selectedOptions = this.options.filter((option) => option.selected);
  }

  standardizeOptions(selectedOptions: IonSelectProps['options']): void {
    this.options.forEach((option) => {
      option.selected = false;

      if (option.label === selectedOptions[0].label) {
        option.selected = true;
      }
    });
  }

  clearSelectedOptions(): void {
    this.selectedOptions = [];
    this.inputValue = '';
    this.option = '';
    this.copyOptions = this.options.map((option) => {
      option.selected = false;
      return option;
    });
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

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeDropdown);
  }
}
