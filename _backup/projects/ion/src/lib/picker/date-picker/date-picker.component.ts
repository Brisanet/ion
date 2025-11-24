import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  CalendarDirection,
  IonDatePickerComponentProps,
} from '../../core/types/datepicker';
import { SafeAny } from '../../utils/safe-any';
import { ControlEvent } from '../control-picker/control-picker.component';
import { UpdateLabelCalendar } from '../core/calendar-model';
import { Day } from '../core/day';
import { PreDefinedRangeConfig } from '../predefined-range-picker/predefined-range-picker.component';
import {
  FINAL_RANGE,
  INITIAL_RANGE,
  arrangeDates,
  calculateDuration,
} from '../../utils';

export const DEFAULT_FINAL_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_INPUT_FORMAT = 'DD/MM/YYYY';

@Component({
  selector: 'ion-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class IonDatepickerComponent implements AfterViewInit {
  @Input() format = DEFAULT_FINAL_FORMAT;
  @Input() formatInDateInput: IonDatePickerComponentProps['formatInDateInput'] =
    DEFAULT_INPUT_FORMAT;
  @Input() rangePicker: boolean;
  @Input() predefinedRanges?: PreDefinedRangeConfig[] = [];
  @Input() direction: IonDatePickerComponentProps['direction'] =
    CalendarDirection.bottomLeft;
  @Input() disabledDate: IonDatePickerComponentProps['disabledDate'];
  @Output() event = new EventEmitter<string[]>();
  currentDate: string[];
  inputDate: string;
  showDatepicker = false;
  calendarMonth: string;
  calendarYear: string;
  selectedDay: Day[] = [];

  calendarControlAction: string;
  goToMonth: string;
  goToYear: string;

  setVisibleCalendar(visible: boolean): void {
    this.showDatepicker = visible;
  }

  ngAfterViewInit(): void {
    document.addEventListener('mouseup', (e: SafeAny) => {
      const calendarContainer =
        document.getElementsByClassName('container-calendar')[0];
      if (calendarContainer && !calendarContainer.contains(e.target)) {
        this.setVisibleCalendar(false);
      }
    });
  }

  events({ event }: ControlEvent): void {
    if (event.type === 'changeMonth') {
      this.goToMonth = event.value;
    }

    if (event.type === 'changeYear') {
      this.goToYear = event.value;
    }

    if (event.type !== 'changeYear' && event.type !== 'changeMonth') {
      this.calendarControlAction = event.type;
      setTimeout(() => {
        this.calendarControlAction = undefined;
      }, 0);
    }
  }

  updateLabelCalendar({ month, year }: UpdateLabelCalendar): void {
    this.calendarMonth = month[0].toLocaleUpperCase() + month.substring(1);
    this.calendarYear = year;
  }

  getFinalFormatDate(data: Day[]): string[] {
    if (!data.length) {
      return [];
    }
    return this.rangePicker
      ? [
          data[INITIAL_RANGE].format(this.format),
          data[FINAL_RANGE].format(this.format),
        ]
      : [data[INITIAL_RANGE].format(this.format)];
  }

  /**
   * @param predefinedRange - defines ranges.
   * @param predefinedRange.label - name of the range.
   * @param predefinedRange.duration - period of the range, it has to be in ISO 8601 format
   * @param [predefinedRange.isFuture=false]  - defines if the period is previously or posteriorly
   * @description - This function is called when a predefined range is selected.
   * @returns void
   */

  onSelectPredefinedRange(predefinedRange: PreDefinedRangeConfig): void {
    if (this.rangePicker) {
      const { duration, isFuture } = predefinedRange;
      const firstDate = new Day();
      const directionMultiplier = isFuture ? 1 : -1;
      const secondDate = new Day(
        new Date(
          firstDate.Date.getTime() +
            calculateDuration(duration) * directionMultiplier
        )
      );
      this.dateSelected([firstDate, secondDate]);
    }
  }

  dateSelected(data: Day[]): void {
    arrangeDates(data);
    this.selectedDay = data;
    this.event.emit(this.getFinalFormatDate(data));
    this.currentDate = this.getFinalFormatDate(data);
    this.inputDate =
      this.rangePicker && data.length
        ? data[INITIAL_RANGE].format(this.formatInDateInput) +
          ' - ' +
          data[FINAL_RANGE].format(this.formatInDateInput)
        : data.length
        ? data[INITIAL_RANGE].format(this.formatInDateInput)
        : '';
    this.showDatepicker = false;
  }

  clearDate(): void {
    this.dateSelected([]);
  }
}
