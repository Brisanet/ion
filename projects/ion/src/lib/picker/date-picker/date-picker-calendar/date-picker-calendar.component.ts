import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FINAL_RANGE,
  INITIAL_RANGE,
  SATURDAY,
  SUNDAY,
  isSameDay,
} from '../../../utils';
import { SafeAny } from '../../../utils/safe-any';
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
export class IonDatePickerCalendarComponent implements OnInit, DoCheck {
  @Input() currentDate: IonDatePickerCalendarComponentProps['currentDate'];
  @Input() lang: IonDatePickerCalendarComponentProps['lang'];
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
  @Input() rangePicker: boolean;
  @Output() events = new EventEmitter<[Day, Day]>();
  @Output() updateLabelCalendar = new EventEmitter<UpdateLabelCalendar>();
  public days: Day[] = [];
  selectedDay: Day[] = [];
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

  constructor() {
    this.setLanguage();
  }

  ngOnInit(): void {
    this.setCalendarInitialState();
    this.tempRenderDays();
  }

  ngDoCheck(): void {
    if (this.calendarControlAction) {
      this.calendarAction[this.calendarControlAction]();
    }
  }

  handleClick(dayIndex: number): void {
    if (this.rangePicker) {
      if (!this.selectedDay.length || this.selectedDay[FINAL_RANGE]) {
        this.selectedDay = [this.days[dayIndex]];
        return;
      }

      this.selectedDay[FINAL_RANGE] = this.days[dayIndex];
      this.arrangeDates();
      this.emitEvent();
      this.setDateInCalendar();
      return;
    }
    this.selectedDay = [this.days[dayIndex]];
    this.emitEvent();
    this.setDateInCalendar();
  }

  isToday(date: Day): boolean {
    const TODAY = new Day(new Date(), this.lang);
    const USELESS_INDEX = 0;
    return isSameDay(date, USELESS_INDEX, TODAY);
  }

  isSelectedDate(date: Day, isFinalOfRange?: boolean): boolean {
    return isSameDay(date, isFinalOfRange ? FINAL_RANGE : INITIAL_RANGE);
  }

  isBetweenRange(date: Day): boolean {
    if (this.selectedDay[INITIAL_RANGE] && this.selectedDay[FINAL_RANGE]) {
      const INITIAL_DATE = new Date(this.selectedDay[INITIAL_RANGE].Date);
      const FINAL_DATE = new Date(this.selectedDay[FINAL_RANGE].Date);
      const CURRENT_DATE = new Date(date.Date);
      return (
        CURRENT_DATE >= INITIAL_DATE &&
        CURRENT_DATE <= FINAL_DATE &&
        this.isNotRangeLimit(date, SATURDAY, INITIAL_RANGE) &&
        this.isNotRangeLimit(date, SUNDAY, FINAL_RANGE)
      );
    }
  }

  isRangeLimit(date: Day, isFinalOfRange?: boolean): boolean {
    const DAY_NAME = isFinalOfRange ? SATURDAY : SUNDAY;
    const RANGE_TO_AVOID = isFinalOfRange ? INITIAL_RANGE : FINAL_RANGE;
    const RANGE_TO_CONFIRM = isFinalOfRange ? FINAL_RANGE : INITIAL_RANGE;
    return (
      (date.day === DAY_NAME && !isSameDay(date, RANGE_TO_AVOID)) ||
      isSameDay(date, RANGE_TO_CONFIRM)
    );
  }

  getWeekDaysElementStrings(): string[] {
    return this.calendar.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }

  getAriaLabel(day: Day): string {
    return day.format('YYYY-MM-DD');
  }

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

  private setLanguage(): void {
    if (!this.lang) {
      this.lang = window.navigator.language;
    }
  }

  private setCalendarInitialState(): void {
    if (this.currentDate && this.currentDate.length) {
      this.selectedDay[INITIAL_RANGE] = new Day(
        this.getFormattedDate(),
        this.lang
      );

      if (this.rangePicker && this.currentDate[FINAL_RANGE]) {
        this.selectedDay[FINAL_RANGE] = new Day(
          this.getFormattedDate(this.finalRange),
          this.lang
        );
      }
    }
    this.calendar = this.getCalendarInstance();
  }

  private setDateInCalendar(): void {
    this.calendar.goToDate(
      this.selectedDay[INITIAL_RANGE].monthNumber,
      this.selectedDay[INITIAL_RANGE].year
    );
  }

  private getInitialDate(): Date {
    return this.currentDate && this.currentDate.length
      ? this.getFormattedDate()
      : new Date();
  }

  private getFormattedDate(isFinalOfRange?: boolean): Date {
    return new Date(
      this.currentDate[isFinalOfRange ? FINAL_RANGE : INITIAL_RANGE].replace(
        '-',
        ','
      )
    );
  }

  private getCalendarInstance = (): Calendar => {
    const initialRenderDay = new Day(this.getInitialDate(), this.lang);
    return new Calendar(
      initialRenderDay.year,
      initialRenderDay.monthNumber,
      this.lang
    );
  };

  private getMonthDaysGrid(): Day[] {
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

  private getLastMonthFinalDays(): number {
    return this.calendar.month.getDay(1).dayNumber - 1;
  }

  private getTotalDaysForCalendar(totalLastMonthFinalDays: number): number {
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

  private getCalendarDay(day: number): Day {
    return this.calendar.month.getDay(day);
  }

  private isDayMonthCurrent(day: Day): boolean {
    return day.monthNumber === this.calendar.month.number;
  }

  private isNotRangeLimit(
    date: Day,
    dayName: string,
    indexRange: number
  ): boolean {
    return !(date.day === dayName && isSameDay(date, indexRange));
  }

  private arrangeDates(): void {
    this.selectedDay.sort((initial, final) => {
      return initial.Date < final.Date ? -1 : initial.Date > final.Date ? 1 : 0;
    });
  }

  private emitEvent(): void {
    this.events.emit([
      this.selectedDay[INITIAL_RANGE],
      this.selectedDay[FINAL_RANGE],
    ]);
  }
}
