import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {
  CalendarDirection,
  IonDatePickerComponentProps,
} from '../../core/types/datepicker';
import { SafeAny } from '../../utils/safe-any';
import { ControlEvent } from '../control-picker/control-picker.component';
import { CalendarControlActions, Day, UpdateLabelCalendar } from '../core';
import { PreDefinedRangeConfig } from '../predefined-range-picker/predefined-range-picker.component';
import {
  FINAL_RANGE,
  INITIAL_RANGE,
  arrangeDates,
  calculateDuration,
} from '../utils/date-picker';
import { IonControlPickerComponent } from '../control-picker/control-picker.component';
import { IonDatePickerCalendarComponent } from './date-picker-calendar/date-picker-calendar.component';
import { IonDatePickerInputComponent } from './date-picker-input/date-picker-input.component';
import { IonPredefinedRangePickerComponent } from '../predefined-range-picker/predefined-range-picker.component';

export const DEFAULT_FINAL_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_INPUT_FORMAT = 'DD/MM/YYYY';

import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'ion-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    IonDatePickerInputComponent,
    IonControlPickerComponent,
    IonDatePickerCalendarComponent,
    IonPredefinedRangePickerComponent,
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class IonDatepickerComponent {
  format = input<string>(DEFAULT_FINAL_FORMAT);
  formatInDateInput =
    input<IonDatePickerComponentProps['formatInDateInput']>(
      DEFAULT_INPUT_FORMAT
    );
  rangePicker = input<boolean>(false);
  predefinedRanges = input<PreDefinedRangeConfig[]>([]);
  direction = input<IonDatePickerComponentProps['direction']>(
    CalendarDirection.bottomLeft
  );
  disabledDate = input<IonDatePickerComponentProps['disabledDate']>();
  event = output<string[]>();

  currentDate = signal<string[]>([]);
  selectedDay = signal<Day[]>([]);
  showDatepicker = signal(false);
  calendarMonth = signal<string>('');
  calendarYear = signal<string>('');
  calendarControlAction = signal<
    { action: CalendarControlActions } | undefined
  >(undefined);
  goToMonth = signal<string | undefined>(undefined);
  goToYear = signal<string | undefined>(undefined);

  overlayPositions = computed<ConnectedPosition[]>(() => {
    const direction = String(
      this.direction()
    ).toUpperCase() as CalendarDirection;

    // Position definitions
    const bottomLeft: ConnectedPosition = {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 5,
    };
    const topLeft: ConnectedPosition = {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -5,
    };
    const bottomRight: ConnectedPosition = {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 5,
    };
    const topRight: ConnectedPosition = {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -5,
    };

    switch (direction) {
      case CalendarDirection.topRight:
        return [topRight, topLeft, bottomRight, bottomLeft];
      case CalendarDirection.topLeft:
        return [topLeft, topRight, bottomLeft, bottomRight];
      case CalendarDirection.bottomRight:
        return [bottomRight, bottomLeft, topRight, topLeft];
      case CalendarDirection.bottomLeft:
      default:
        return [bottomLeft, bottomRight, topLeft, topRight];
    }
  });

  private elementRef!: ElementRef<HTMLElement>;

  inputDate = computed(() => {
    const selected = this.selectedDay();
    if (!selected.length) {
      return '';
    }

    const format = this.formatInDateInput() || DEFAULT_INPUT_FORMAT;
    if (this.rangePicker() && selected[FINAL_RANGE]) {
      return (
        selected[INITIAL_RANGE].format(format) +
        ' - ' +
        selected[FINAL_RANGE].format(format)
      );
    }

    return selected[INITIAL_RANGE].format(format);
  });

  constructor(private host: ElementRef<HTMLElement>) {
    this.elementRef = host;
  }

  setVisibleCalendar(visible: boolean): void {
    this.showDatepicker.set(visible);
  }

  events({ event }: ControlEvent): void {
    if (!event) return;

    if (event.type === 'changeMonth') {
      this.goToMonth.set(event.value);
    }

    if (event.type === 'changeYear') {
      this.goToYear.set(event.value);
    }

    if (event.type !== 'changeYear' && event.type !== 'changeMonth') {
      this.calendarControlAction.set({ action: event.type });
    }
  }

  updateLabelCalendar({ month, year }: UpdateLabelCalendar): void {
    this.calendarMonth.set(month[0].toLocaleUpperCase() + month.substring(1));
    this.calendarYear.set(year);
  }

  onSelectPredefinedRange(predefinedRange: PreDefinedRangeConfig): void {
    if (!this.rangePicker()) {
      return;
    }
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

  dateSelected(data: Day[]): void {
    arrangeDates(data);
    this.selectedDay.set(data);
    const formatted = this.getFinalFormatDate(data);
    this.event.emit(formatted);
    this.currentDate.set(formatted);
    this.setVisibleCalendar(false);
  }

  clearDate(): void {
    this.dateSelected([]);
  }

  private getFinalFormatDate(data: Day[]): string[] {
    if (!data.length) {
      return [];
    }
    return this.rangePicker()
      ? [
          data[INITIAL_RANGE].format(this.format()),
          data[FINAL_RANGE].format(this.format()),
        ]
      : [data[INITIAL_RANGE].format(this.format())];
  }
}
