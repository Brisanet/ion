import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ion-input-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class IonInputAreaComponent {
  cols = input<string>('30');
  rows = input<string>('5');
  disabled = input<boolean>(false);
  value = input<string>();
  placeholder = input<string>();
  valueChange = output<string>();

  onChange(value: string): void {
    this.valueChange.emit(value);
  }
}
