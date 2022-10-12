import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Calendar } from '../core/calendar';
import { Day } from '../core/day';

type DateEmitter = {
  date: string;
};

type DateField = {
  element: HTMLElement;
  date: Day;
  label: string;
};

export interface IonDatePickerProps {
  isCalendarVisible?: boolean;
  initialDate?: string;
  lang?: string;
  events?: EventEmitter<DateEmitter>;
}
@Component({
  selector: 'ion-date-picker-basic',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('calendarContainer', { static: true })
  public calendarContaiener: ElementRef<HTMLElement>;
  @ViewChild('monthDaysContainer', { static: true })
  public monthDaysContainer: ElementRef<HTMLElement>;
  @Input()
  isCalendarVisible = false;
  @Input() initialDate: string;
  @Input() lang: string;
  @Output() events = new EventEmitter<DateEmitter>();
  selectedDate: Day;
  monthYear: string;
  calendar: Calendar;
  selectedDayElement: HTMLButtonElement;
  isVisibleIconClose = false;
  currentFieldDate: string;
  hasDateInFields = false;
  dateContainer: HTMLElement;
  dateField: DateField = {
    element: null,
    date: undefined,
    label: undefined,
  };

  constructor() {
    this.setLanguage();
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

  getInitialDate = () =>
    this.initialDate
      ? new Date(this.initialDate.replace('-', ','))
      : new Date();

  getCalendarInstance = () =>
    new Calendar(
      this.selectedDate.year,
      this.selectedDate.monthNumber,
      this.lang
    );

  renderCalendarDays() {
    this.updatedMonthYear();
    this.updateMonthDays();
  }

  updatedMonthYear() {
    this.monthYear = `${this.calendar.month.name} - ${this.calendar.year}`;
  }

  updateMonthDays() {
    this.monthDaysContainer.nativeElement.innerHTML = '';

    this.getMonthDaysGrid().forEach((day) => {
      this.monthDaysContainer.nativeElement.appendChild(
        this.createButtonElementOfTheDay(day)
      );
    });
  }

  createButtonElementOfTheDay(day: Day): HTMLButtonElement {
    const buttonDay = document.createElement('button');
    this.setTextButtonDay(buttonDay, day);
    this.setStyleButtonDay(buttonDay, day);
    this.setAriaLabelButtonDay(buttonDay, day);
    buttonDay.addEventListener('click', () =>
      this.dispatchActions(buttonDay, day)
    );

    return buttonDay;
  }

  setTextButtonDay(buttonDay: HTMLButtonElement, day: Day) {
    buttonDay.textContent = day.date.toString();
  }

  setStyleButtonDay(buttonDay: HTMLButtonElement, day: Day) {
    this.addClassElement(buttonDay, 'month-day');
    this.isDayCurrentMonth(day) && this.addClassElement(buttonDay, 'current');

    if (this.isSelectedDate(day)) {
      this.addClassElement(buttonDay, 'selected');
      this.selectedDayElement = buttonDay;
    }
  }

  setAriaLabelButtonDay = (buttonDay: HTMLButtonElement, day: Day) =>
    buttonDay.setAttribute('aria-label', day.format('YYYY-MM-DD'));

  isDayCurrentMonth = (day: Day) =>
    day.monthNumber === this.calendar.month.number;

  getMonthDaysGrid() {
    const prevMonth = this.calendar.getPreviousMonth();
    const totalLastMonthFinalDays = this.getTotalLastMonthFinalDays();
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

  getTotalLastMonthFinalDays = (): number =>
    this.calendar.month.getDay(1).dayNumber - 1;

  getTotalDaysForCalendar(totalLastMonthFinalDays: number): number {
    const totalDays =
      this.calendar.month.numberOfDays + totalLastMonthFinalDays;

    if (totalDays > 35) {
      return 42;
    }

    if (totalDays > 28) {
      return 35;
    }

    return 28;
  }

  dispatchActions(buttonDay: HTMLButtonElement, day: Day) {
    this.selectedDate = day;
    this.selectedDayElement = buttonDay;
    this.setCurrentDate();
    this.hasDateInFields = true;
    this.updateMonthDays();
    this.setDateInCalendar();
    this.emmitEvent();
  }

  setCurrentDate() {
    this.dateField.date = this.selectedDate;
    this.dateField.label = this.selectedDate.format('YYYY-MM-DD');
  }

  clearCurrentDate() {
    this.dateField.date = undefined;
    this.dateField.label = undefined;
  }

  emmitEvent() {
    this.events.emit({ date: this.dateField.label });
    this.closeCalendar();
  }

  addClassElement(el: HTMLElement, className) {
    el.classList.add(className);
  }

  isSelectedDate(date) {
    return (
      date.date === this.selectedDate.date &&
      date.monthNumber === this.selectedDate.monthNumber &&
      date.year === this.selectedDate.year
    );
  }

  ngAfterViewInit(): void {
    this.getHtmlElementsReferences();
    this.addEventsInDateContainer();

    if (this.isCalendarVisible) {
      this.calendarContaiener.nativeElement.style.display = 'block';

      this.dateField.element.focus();
      return;
    }

    this.calendarContaiener.nativeElement.style.display = 'none';
  }

  getHtmlElementsReferences() {
    this.dateContainer = document.getElementById('date-container');
    this.dateField.element = document.getElementById('input-date');
  }

  addEventsInDateContainer() {
    this.dateContainer.addEventListener(
      'mouseover',
      () => this.hasDateInFields && this.setVisibleIconClose(true)
    );
    this.dateContainer.addEventListener('mouseleave', () =>
      this.setVisibleIconClose(false)
    );
  }

  setVisibleIconClose(isVisible: boolean) {
    this.isVisibleIconClose = isVisible;
  }

  clearCalendar(closeCalendar = false) {
    this.clearDatesObject();
    this.hasDateInFields = false;
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDateInCalendar();
    this.setVisibleIconClose(false);
    closeCalendar && this.closeCalendar();
  }

  clearDatesObject() {
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

  setFocusOnClickInput() {
    this.calendarContaiener.nativeElement.style.display = 'block';
    this.currentFieldDate = 'date';
    this.dateField.element.focus();
  }

  actionClickIcon() {
    if (this.isVisibleIconClose) {
      this.clearCalendar(true);
      return;
    }

    this.setFocusOnClickInput();
  }

  closeCalendar() {
    this.calendarContaiener.nativeElement.style.display = 'none';
  }

  previousMonth() {
    this.calendar.goToPreviousMonth();
    this.renderCalendarDays();
  }

  nextMonth() {
    this.calendar.goToNextMonth();
    this.renderCalendarDays();
  }

  previousYear() {
    this.calendar.goToPreviousYear(this.calendar.month.number - 1);
    this.renderCalendarDays();
  }

  nextYear() {
    this.calendar.goToNextYear(this.calendar.month.number - 1);
    this.renderCalendarDays();
  }

  getWeekDaysElementStrings() {
    return this.calendar.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }
}
