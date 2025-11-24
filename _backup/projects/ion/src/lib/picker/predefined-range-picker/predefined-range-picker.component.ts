import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PreDefinedRangeConfig {
  label: string;
  duration: string;
  isFuture?: boolean;
}

@Component({
  selector: 'ion-predefined-range-picker',
  templateUrl: './predefined-range-picker.component.html',
  styleUrls: ['./predefined-range-picker.component.scss'],
})
export class IonPredefinedRangePickerComponent {
  @Input() config: PreDefinedRangeConfig[];
  @Output() definedRangePicker: EventEmitter<PreDefinedRangeConfig> =
    new EventEmitter<PreDefinedRangeConfig>();

  handlePreDefinedRange(event: PreDefinedRangeConfig): void {
    this.definedRangePicker.emit(event);
  }
}
