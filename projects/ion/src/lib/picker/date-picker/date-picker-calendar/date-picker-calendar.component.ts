import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { SafeAny } from '../../../utils/safe-any';
import { Calendar } from '../../core/calendar';
import { Day } from '../../core/day';

type DateEmitter = {
  date: string;
};

type DateField = {
  date: Day;
  label: string;
};

export type UpdateLabelCalendar = {
  month: string;
  year: string;
};

export interface IonDatePickerProps {
  currentDate?: string;
  lang?: string;
  events?: EventEmitter<DateEmitter>;
}
@Component({
  selector: 'date-picker-calendar',
  templateUrl: './date-picker-calendar.component.html',
  styleUrls: ['./date-picker-calendar.component.scss'],
})
export class DatePickerCalendarComponent implements OnInit, DoCheck {
  @Input() currentDate: IonDatePickerProps['currentDate'];
  @Input() lang: IonDatePickerProps['lang'];
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
  @Input() calendarControlAction:
    | 'previousYear'
    | 'previousMonth'
    | 'nextMonth'
    | 'nextYear';
  @Output() events = new EventEmitter<DateEmitter>();
  @Output() updateLabelCalendar = new EventEmitter<UpdateLabelCalendar>();
  public days: Day[] = [];
  selectedDate: Day;
  monthYear: string;
  calendar: Calendar;
  selectedDayElement: HTMLButtonElement;
  dateField: DateField = {
    date: undefined,
    label: undefined,
  };

  constructor() {
    this.setLanguage();
  }

  setLanguage(): void {
    if (!this.lang) {
      this.lang = window.navigator.language;
    }
  }

  ngOnInit(): void {
    this.setCalendarInitialState();
    this.tempRenderDays();
  }

  setCalendarInitialState(): void {
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.calendar = this.getCalendarInstance();
  }

  getInitialDate(): Date {
    return this.currentDate
      ? new Date(this.currentDate.replace('-', ','))
      : new Date();
  }

  getCalendarInstance = (): Calendar =>
    new Calendar(
      this.selectedDate.year,
      this.selectedDate.monthNumber,
      this.lang
    );

  tempRenderDays(): void {
    this.days = this.getMonthDaysGrid();
    this.days.map((day) => {
      (day as SafeAny).isDayCurrentMonth = this.isDayMonthCurrent(day);
    });

    setTimeout(() => {
      this.updateLabelCalendar.emit({
        month: this.calendar.month.name,
        year: String(this.calendar.year),
      });
    }, 100);
  }

  isDayMonthCurrent(day: Day): boolean {
    return day.monthNumber === this.calendar.month.number;
  }

  getMonthDaysGrid(): Day[] {
    const prevMonth = this.calendar.getPreviousMonth();
    const totalLastMonthFinalDays = this.getLastMonthFinalDays();
    const totalDays = this.getTotalDaysForCalendar(totalLastMonthFinalDays);
    const monthList = Array.from<Day>({ length: totalDays });

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = this.getCalendarDay(i + 1 - totalLastMonthFinalDays);
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
    }

    return monthList;
  }

  getLastMonthFinalDays(): number {
    return this.calendar.month.getDay(1).dayNumber - 1;
  }

  getTotalDaysForCalendar(totalLastMonthFinalDays: number): number {
    const totalDaysWithSixWeeks = 42;
    const totalDaysWithFiveWeeks = 35;
    const totalDaysWithFourWeeks = 28;

    const totalDays =
      this.calendar.month.numberOfDays + totalLastMonthFinalDays;

    if (totalDays > totalDaysWithFiveWeeks) {
      return totalDaysWithSixWeeks;
    }

    if (totalDays > totalDaysWithFourWeeks) {
      return totalDaysWithFiveWeeks;
    }

    return totalDaysWithFourWeeks;
  }

  getCalendarDay(day: number): Day {
    return this.calendar.month.getDay(day);
  }

  getWeekDaysElementStrings(): string[] {
    return this.calendar.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }

  getAriaLabel(day: Day): string {
    return day.format('YYYY-MM-DD');
  }

  isSelectedDate(date: Day): boolean {
    return (
      date.date === this.selectedDate.date &&
      date.monthNumber === this.selectedDate.monthNumber &&
      date.year === this.selectedDate.year
    );
  }

  dispatchActions(dayIndex: number): void {
    this.selectedDate = this.days[dayIndex];
    this.dateField = {
      date: this.selectedDate,
      label: this.selectedDate.format('YYYY-MM-DD'),
    };
    this.emitEvent();
    this.setDateInCalendar();
  }

  emitEvent(): void {
    this.events.emit({ date: this.dateField.label });
  }

  clearCalendar(): void {
    this.clearDateField();
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDateInCalendar();
  }

  clearDateField(): void {
    this.dateField.date = undefined;
    this.dateField.label = undefined;
  }

  setDateInCalendar(): void {
    this.calendar.goToDate(
      this.selectedDate.monthNumber,
      this.selectedDate.year
    );
  }

  previousYear(): void {
    this.calendar.goToPreviousYear(this.calendar.month.number - 1);
    this.tempRenderDays();
  }

  previousMonth(): void {
    this.calendar.goToPreviousMonth();
    this.tempRenderDays();
  }

  nextMonth(): void {
    this.calendar.goToNextMonth();
    this.tempRenderDays();
  }

  nextYear(): void {
    this.calendar.goToNextYear(this.calendar.month.number - 1);
    this.tempRenderDays();
  }

  ngDoCheck(): void {
    if (this.calendarControlAction === 'previousYear') {
      this.previousYear();
    }

    if (this.calendarControlAction === 'previousMonth') {
      this.previousMonth();
    }

    if (this.calendarControlAction === 'nextMonth') {
      this.nextMonth();
    }

    if (this.calendarControlAction === 'nextYear') {
      this.nextYear();
    }
  }
}
