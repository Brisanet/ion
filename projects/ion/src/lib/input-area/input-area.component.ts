import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IonInputAreaProps {
  cols?: string;
  rows?: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  valueChange?: EventEmitter<string>;
}

@Component({
  selector: 'ion-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class IonInputAreaComponent {
  @Input() cols = '30';
  @Input() rows = '5';
  @Input() disabled = false;
  @Input() value: string;
  @Input() placeholder?: string;
  @Output() valueChange = new EventEmitter<string>();

  onChange(value: string): void {
    this.valueChange.emit(value);
  }
}
