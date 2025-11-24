import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import {
  arrangeDates,
  FINAL_RANGE,
  getFormattedDate,
  getInitialDate,
  INITIAL_RANGE,
  isBetweenRange,
  isSameDay,
  isToday,
  SATURDAY,
  SUNDAY,
  TOTAL_DAYS,
} from '../../../utils';
import { Calendar } from '../../core/calendar';
import {
  CalendarControlActions,
  IonDatePickerCalendarComponentProps,
  UpdateLabelCalendar,
} from '../../core/calendar-model';
import { Day } from '../../core/day';

@Component({
  selector: 'date-picker-calendar',
  templateUrl: './date-picker-calendar.component.html',
  styleUrls: ['./date-picker-calendar.component.scss'],
})
export class IonDatePickerCalendarComponent implements OnInit, OnChanges {
  @Input() currentDate: IonDatePickerCalendarComponentProps['currentDate'];
  @Input() lang: IonDatePickerCalendarComponentProps['lang'] =
    window.navigator.language;
  @Input() set goToMonthInCalendar(month: string) {
    if (this.calendar) {
      this.calendar.goToDate(Number(month) + 1, this.calendar.year);
      this.tempRenderDays();
    }
  }
  @Input() set goToYearInCalendar(year: string) {
    if (this.calendar) {
      this.calendar.goToDate(this.calendar.month.number, Number(year));
      this.tempRenderDays();
    }
  }
  @Input() calendarControlAction: CalendarControlActions;
  @Input() selectedDays: Day[] = [];
  @Input() rangePicker: boolean;
  @Input() disabledDate: IonDatePickerCalendarComponentProps['disabledDate'];
  @Output() events = new EventEmitter<[Day, Day]>();
  @Output() updateLabelCalendar = new EventEmitter<UpdateLabelCalendar>();
  public days: Day[] = [];
  monthYear: string;
  calendar: Calendar;
  selectedDayElement: HTMLButtonElement;
  calendarAction = {
    previousYear: (): void => this.previousYear(),
    previousMonth: (): void => this.previousMonth(),
    nextMonth: (): void => this.nextMonth(),
    nextYear: (): void => this.nextYear(),
  };
  public finalRange = true;

  previousYear(): void {
    this.calendar.goToPreviousYear(this.calendar.month.number - 1);
  }

  previousMonth(): void {
    this.calendar.goToPreviousMonth();
  }

  nextMonth(): void {
    this.calendar.goToNextMonth();
  }

  nextYear(): void {
    this.calendar.goToNextYear(this.calendar.month.number - 1);
  }

  ngOnInit(): void {
    if (this.selectedDays.length) {
      arrangeDates(this.selectedDays);
    }
    this.setCalendarInitialState();
    this.tempRenderDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.calendarControlAction &&
      changes.calendarControlAction.currentValue
    ) {
      this.calendarAction[this.calendarControlAction]();
      this.tempRenderDays();
    }
  }

  handleClick(dayIndex: number): void {
    if (this.days[dayIndex].disabled) {
      return;
    }

    if (this.rangePicker) {
      if (!this.selectedDays.length || this.selectedDays[FINAL_RANGE]) {
        this.selectedDays = [this.days[dayIndex]];
        return;
      }

      this.selectedDays[FINAL_RANGE] = this.days[dayIndex];
      arrangeDates(this.selectedDays);
      this.emitEvent();
      this.setDateInCalendar();
      return;
    }
    this.selectedDays = [this.days[dayIndex]];
    this.emitEvent();
    this.setDateInCalendar();
  }

  isSelectedDate(date: Day, isFinalOfRange?: boolean): boolean {
    return isSameDay(
      date,
      isFinalOfRange
        ? this.selectedDays[FINAL_RANGE]
        : this.selectedDays[INITIAL_RANGE]
    );
  }

  tempRenderDays(): void {
    this.days = this.getMonthDaysGrid();
    this.days.map((day) => {
      day.isDayCurrentMonth = this.isDayMonthCurrent(day);
      day.isToday = isToday(day, this.lang);
      day.isBetweenRange = isBetweenRange(day, this.selectedDays);
      day.isRangeInitialLimit = this.isRangeLimit(day);
      day.isRangeFinalLimit = this.isRangeLimit(day, this.finalRange);
      if (this.disabledDate) {
        day.disabled = this.disabledDate(day.Date);
      }
    });

    setTimeout(() => {
      this.updateLabelCalendar.emit({
        month: this.calendar.month.name,
        year: String(this.calendar.year),
      });
    }, 100);
  }

  private setCalendarInitialState(): void {
    if (
      this.currentDate &&
      this.currentDate.length &&
      !this.selectedDays.length
    ) {
      this.selectedDays[INITIAL_RANGE] = new Day(
        getFormattedDate(this.currentDate),
        this.lang
      );

      if (this.rangePicker && this.currentDate[FINAL_RANGE]) {
        this.selectedDays[FINAL_RANGE] = new Day(
          getFormattedDate(this.currentDate, this.finalRange),
          this.lang
        );
      }
    }
    this.calendar = this.getCalendarInstance();
  }

  private setDateInCalendar(): void {
    this.calendar.goToDate(
      this.selectedDays[INITIAL_RANGE].monthNumber,
      this.selectedDays[INITIAL_RANGE].year
    );
  }

  private getCalendarInstance = (): Calendar => {
    const initialRenderDay = new Day(
      getInitialDate(this.currentDate),
      this.lang
    );
    return new Calendar(
      initialRenderDay.year,
      initialRenderDay.monthNumber,
      this.lang
    );
  };

  private getMonthDaysGrid(): Day[] {
    const prevMonth = this.calendar.getPreviousMonth();
    const totalLastMonthFinalDays = this.calendar.getLastMonthFinalDays();
    const totalDays = this.getTotalDaysForCalendar(totalLastMonthFinalDays);
    const monthList = Array.from<Day>({ length: totalDays });

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = this.calendar.getDay(i + 1 - totalLastMonthFinalDays);
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
    }

    return monthList;
  }

  private getTotalDaysForCalendar(totalLastMonthFinalDays: number): number {
    const totalDays =
      this.calendar.month.numberOfDays + totalLastMonthFinalDays;

    if (totalDays > TOTAL_DAYS.WITH_FIVE_WEEKS) {
      return TOTAL_DAYS.WITH_SIX_WEEKS;
    }

    if (totalDays > TOTAL_DAYS.WITH_FOUR_WEEKS) {
      return TOTAL_DAYS.WITH_FIVE_WEEKS;
    }

    return TOTAL_DAYS.WITH_FOUR_WEEKS;
  }

  private isDayMonthCurrent(day: Day): boolean {
    return day.monthNumber === this.calendar.month.number;
  }

  private isRangeLimit(date: Day, isFinalOfRange?: boolean): boolean {
    const [DAY_NAME, RANGE_TO_AVOID, RANGE_TO_CONFIRM] = isFinalOfRange
      ? [SATURDAY, INITIAL_RANGE, FINAL_RANGE]
      : [SUNDAY, FINAL_RANGE, INITIAL_RANGE];
    return (
      (date.day === DAY_NAME &&
        !isSameDay(date, this.selectedDays[RANGE_TO_AVOID])) ||
      isSameDay(date, this.selectedDays[RANGE_TO_CONFIRM])
    );
  }

  private emitEvent(): void {
    this.events.emit([
      this.selectedDays[INITIAL_RANGE],
      this.selectedDays[FINAL_RANGE],
    ]);
  }
}
