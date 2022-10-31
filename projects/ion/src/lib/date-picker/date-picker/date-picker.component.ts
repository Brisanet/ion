import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { Calendar } from '../core/calendar';
import { Day } from '../core/day';

type DateEmitter = {
  date: string;
};

type DateField = {
  date: Day;
  label: string;
};

export interface IonDatePickerProps {
  isCalendarVisible?: boolean;
  initialDate?: string;
  lang?: string;
  placeholder?: string;
  isRequired?: boolean;
  events?: EventEmitter<DateEmitter>;
}
@Component({
  selector: 'ion-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input()
  isCalendarVisible = false;
  @Input() initialDate: IonDatePickerProps['initialDate'];
  @Input() lang: IonDatePickerProps['lang'];
  @Input() placeholder = 'Data';
  @Input() isRequired = false;
  @Output() events = new EventEmitter<DateEmitter>();
  public showCalendar = false;
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

  ngAfterViewInit(): void {
    document.addEventListener('mouseup', (e: SafeAny) => {
      const calendarContaiener =
        document.getElementsByClassName('calendar-container')[0];
      if (calendarContaiener && !calendarContaiener.contains(e.target)) {
        this.closeCalendar();
        this.setDateInCalendar();
      }
    });
  }

  setLanguage() {
    if (!this.lang) {
      this.lang = window.navigator.language;
    }
  }

  ngOnInit() {
    this.setCalendarInitialState();
  }

  setCalendarInitialState() {
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.calendar = this.getCalendarInstance();
    this.renderCalendarDays();
  }

  getInitialDate() {
    return this.initialDate
      ? new Date(this.initialDate.replace('-', ','))
      : new Date();
  }

  getCalendarInstance = () =>
    new Calendar(
      this.selectedDate.year,
      this.selectedDate.monthNumber,
      this.lang
    );

  renderCalendarDays() {
    this.updatedMonthYear();
  }

  updatedMonthYear() {
    this.monthYear = `${this.calendar.month.name} - ${this.calendar.year}`;
  }

  getAriaLabel(day: Day) {
    return day.format('YYYY-MM-DD');
  }

  isDayMonthCurrent(day: Day): boolean {
    return day.monthNumber === this.calendar.month.number;
  }

  getMonthDaysGrid() {
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

  getCalendarDay(day: number) {
    return this.calendar.month.getDay(day);
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

  dispatchActions(dayIndex: number) {
    this.selectedDate = this.days[dayIndex];
    this.dateField = {
      date: this.selectedDate,
      label: this.selectedDate.format('YYYY-MM-DD'),
    };
    this.emmitEvent();
    this.setDateInCalendar();
    this.closeCalendar();
  }

  emmitEvent() {
    this.events.emit({ date: this.dateField.label });
  }

  isSelectedDate(date: Day) {
    return (
      date.date === this.selectedDate.date &&
      date.monthNumber === this.selectedDate.monthNumber &&
      date.year === this.selectedDate.year
    );
  }

  clearCalendar() {
    this.clearDateField();
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDateInCalendar();
  }

  clearDateField() {
    this.dateField.date = undefined;
    this.dateField.label = undefined;
  }

  setDateInCalendar() {
    this.calendar.goToDate(
      this.selectedDate.monthNumber,
      this.selectedDate.year
    );
    this.renderCalendarDays();
  }

  tempRenderDays() {
    this.days = this.getMonthDaysGrid();
    this.days.map((day) => {
      (day as SafeAny).isDayCurrentMonth = this.isDayMonthCurrent(day);
    });
  }

  setFocusOnClickInput() {
    this.showCalendar = true;
    this.renderCalendarDays();
    this.tempRenderDays();
  }

  closeCalendar() {
    this.showCalendar = false;
  }

  previousMonth() {
    this.calendar.goToPreviousMonth();
    this.renderCalendarDays();
    this.tempRenderDays();
  }

  nextMonth() {
    this.calendar.goToNextMonth();
    this.renderCalendarDays();
    this.tempRenderDays();
  }

  previousYear() {
    this.calendar.goToPreviousYear(this.calendar.month.number - 1);
    this.renderCalendarDays();
    this.tempRenderDays();
  }

  nextYear() {
    this.calendar.goToNextYear(this.calendar.month.number - 1);
    this.renderCalendarDays();
    this.tempRenderDays();
  }

  getWeekDaysElementStrings() {
    return this.calendar.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }
}
