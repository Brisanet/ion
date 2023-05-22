import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DropdownItem } from '../core/types';

type Mode = 'default' | 'multiple';
@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements AfterViewInit {
  @Input() mode: Mode = 'multiple';
  @Input() placeholder = '';
  @Input() options: DropdownItem[] = [
    { label: 'opção 01', selected: false },
    { label: 'opção 02', selected: false },
  ];

  @Output() events = new EventEmitter<DropdownItem[]>();

  showDropdown = false;
  option = '';
  inputValue = '';
  selectedOptions: DropdownItem[] = [];

  onSelect(event): void {
    if (event.target.id === 'ion-select') {
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

  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => this.closeDropdown(e));
  }

  closeDropdown(event: MouseEvent): void {
    // logica para fechar quando clicar fora do elemento
  }

  selected(options: DropdownItem[]): void {
    this.events.emit(options);

    if (this.mode !== 'multiple') {
      this.option = options.length > 0 ? options[0].label : '';
      this.showDropdown = false;
      return;
    }

    this.selectedOptions = options.length > 0 ? options : [];
  }

  clearSelectedOptions(): void {
    this.selectedOptions = [];
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
}
