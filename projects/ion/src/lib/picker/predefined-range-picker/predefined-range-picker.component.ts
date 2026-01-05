import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonChipComponent } from '../../chip/chip.component';

export interface PreDefinedRangeConfig {
  label: string;
  duration: string;
  isFuture?: boolean;
}

@Component({
  selector: 'ion-predefined-range-picker',
  standalone: true,
  imports: [CommonModule, IonChipComponent],
  templateUrl: './predefined-range-picker.component.html',
  styleUrls: ['./predefined-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonPredefinedRangePickerComponent {
  config = input<PreDefinedRangeConfig[]>([]);
  definedRangePicker = output<PreDefinedRangeConfig>();

  handlePreDefinedRange(event: PreDefinedRangeConfig): void {
    this.definedRangePicker.emit(event);
  }
}
