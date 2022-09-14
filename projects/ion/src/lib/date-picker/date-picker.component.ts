import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { Calendar } from './calendar';
import { Day } from './day';

type DateEmitter = {
  date?: string;
  startDate?: string;
  endDate?: string;
};

type DateField = {
  element: HTMLElement;
  date: Day;
  dateLabel: string;
};

interface Dates {
  date: DateField;
  startDate: DateField;
  endDate: DateField;
}

const sunday = 1;
const saturday = 7;
@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input() format: string;
  @Input() isCalendarVisible = false;
  @Input() isDateRange = false;
  @Input() initialDate: string;
  @Input() lang: string;
  @Output() date = new EventEmitter<DateEmitter>();
  selectedDate: Day;
  monthYear: string;
  calendar: Calendar;
  calendarElement: HTMLElement;
  selectedDayElement: HTMLButtonElement;
  isVisibleIconClose = false;
  currentFieldDate: string;
  hasDateInFields = false;
  dateContainer: HTMLElement;
  dates: Dates = {
    date: {
      element: null,
      date: undefined,
      dateLabel: undefined,
    },
    startDate: {
      element: null,
      date: undefined,
      dateLabel: undefined,
    },
    endDate: {
      element: null,
      date: undefined,
      dateLabel: undefined,
    },
  };
  isDisabledConfirmButton = true;

  constructor() {
    this.setLanguage();
  }

  setLanguage() {
    if (!this.lang) {
      this.lang = window.navigator.language;
    }
  }

  ngOnInit() {
    this.calendarInitialState();
  }

  calendarInitialState() {
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.createCalendarInstance();
    this.renderCalendarDays();

    this.calendarElement = document.getElementById('calendar');
  }

  getInitialDate = () =>
    this.initialDate
      ? new Date(this.initialDate.replace('-', ','))
      : new Date();

  createCalendarInstance() {
    this.calendar = new Calendar(
      this.selectedDate.year,
      this.selectedDate.monthNumber,
      this.lang
    );
  }

  renderCalendarDays() {
    this.updatedMonthYear();
    this.updateMonthDays();
  }

  updatedMonthYear() {
    this.monthYear = `${this.calendar.month.name} - ${this.calendar.year}`;
  }

  updateMonthDays() {
    const monthDaysContainer = document.getElementById('month-days');
    monthDaysContainer.innerHTML = '';

    this.getMonthDaysGrid().forEach((day) => {
      monthDaysContainer.appendChild(this.createButtonElementOfTheDay(day));
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

    if (this.hasSelectedDates()) {
      if (
        !this.isSelectedDateButton(day, 'startDate') ||
        !this.isSelectedDateButton(day, 'endDate')
      ) {
        this.isSunday(day) &&
          !this.isSelectedDateButton(day, 'endDate') &&
          this.addClassElement(buttonDay, 'sunday');

        this.isSaturday(day) &&
          !this.isSelectedDateButton(day, 'startDate') &&
          this.addClassElement(buttonDay, 'saturday');

        if (
          day.timestamp > this.dates.startDate.date.timestamp &&
          day.timestamp < this.dates.endDate.date.timestamp
        ) {
          this.addClassElement(buttonDay, 'in-range');
        }
      }
    }

    if (this.isDateRange) {
      if (this.isSelectedDateButton(day, 'startDate')) {
        this.setStyleStartDateButton(buttonDay, day);
        return;
      }

      if (this.isSelectedDateButton(day, 'endDate')) {
        this.setStyleEndDateButton(buttonDay, day);
        return;
      }
    }
  }

  hasSelectedDates = () =>
    !!this.dates.startDate.date && !!this.dates.endDate.date;

  isSelectedDateButton = (day: Day, name: 'startDate' | 'endDate') =>
    day.format('YYYY-MM-DD') === this.dates[name].dateLabel;

  isSunday = (day: Day) => day.dayNumber === sunday;

  isSaturday = (day: Day) => day.dayNumber === saturday;

  setStyleStartDateButton(buttonDay: HTMLButtonElement, day: Day) {
    this.addClassElement(buttonDay, 'selected-start-date');

    this.hasSelectedDates() &&
      !this.isSaturday(day) &&
      this.addClassElement(buttonDay, 'first-range');
  }

  setStyleEndDateButton(buttonDay: HTMLButtonElement, day: Day) {
    this.addClassElement(buttonDay, 'selected-end-date');

    if (this.hasSelectedDates()) {
      buttonDay.setAttribute('data-content', buttonDay.textContent);
      !this.isSunday(day) && this.addClassElement(buttonDay, 'end-range');
    }
  }

  setAriaLabelButtonDay = (buttonDay: HTMLButtonElement, day: Day) =>
    buttonDay.setAttribute(
      'aria-label',
      day.format(this.format || 'YYYY-MM-DD')
    );

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
    if (!day) return;

    this.selectedDate = day;
    this.selectedDayElement = buttonDay;
    this.updateDateOnInput();
    this.hasDateInFields = true;
    this.updateMonthDays();

    if (!this.isDateRange) {
      this.emmitEvent();
      this.closeCalendar();
    }

    this.setDateInCalendar();
  }

  updateDateOnInput() {
    if (this.isDateRange) {
      if (this.currentFieldDate === 'startDate' && !this.isValidStartDate()) {
        this.clearCurrentDate();
        this.isDisabledConfirmButton = true;
        return;
      }

      if (this.currentFieldDate === 'endDate' && !this.isValidEndDate()) {
        this.clearCurrentDate();
        this.isDisabledConfirmButton = true;
        return;
      }
    }

    this.setCurrentDate();
    this.setFocusWhenUpdatingADate();
  }

  isValidStartDate = () =>
    !this.dates.endDate.date ||
    (this.dates.endDate.date &&
      this.dates.endDate.date.timestamp >= this.selectedDate.timestamp);

  isValidEndDate = () =>
    !this.dates.startDate.date ||
    (this.dates.startDate.date &&
      this.dates.startDate.date.timestamp <= this.selectedDate.timestamp);

  setCurrentDate() {
    this.dates[this.currentFieldDate].date = this.selectedDate;
    this.dates[this.currentFieldDate].dateLabel = this.selectedDate.format(
      this.format || 'YYYY-MM-DD'
    );
  }

  clearCurrentDate() {
    this.dates[this.currentFieldDate].date = undefined;
    this.dates[this.currentFieldDate].dateLabel = undefined;
  }

  setFocusWhenUpdatingADate() {
    if (!this.isDateRange) return;

    if (this.dates.startDate.date && this.dates.endDate.date) {
      this.isDisabledConfirmButton = false;
      this.currentFieldDate === 'startDate'
        ? this.dates.startDate.element.focus()
        : this.dates.endDate.element.focus();
      return;
    }

    if (this.currentFieldDate === 'startDate') {
      this.dates.endDate.element.focus();
      this.currentFieldDate = 'endDate';
      return;
    }

    this.dates.startDate.element.focus();
    this.currentFieldDate = 'startDate';
  }

  emmitEvent() {
    if (this.isDateRange) {
      !this.isDisabledConfirmButton &&
        this.date.emit({
          startDate: this.dates.startDate.dateLabel,
          endDate: this.dates.endDate.dateLabel,
        });
      return;
    }

    this.date.emit({ date: this.dates.date.dateLabel });
  }

  addClassElement(el: HTMLElement, className) {
    el.classList.add(className);
  }

  removeClassElement(el: HTMLElement, className) {
    el.classList.remove(className);
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
      this.calendarElement.style.display = 'block';

      if (this.isDateRange) {
        this.dates.startDate.element.focus();
        return;
      }
      this.dates.date.element.focus();
    }
  }

  getHtmlElementsReferences() {
    this.dateContainer = document.getElementById('date-container');
    if (this.isDateRange) {
      this.dates.startDate.element =
        document.getElementById('input-start-date');
      this.dates.endDate.element = document.getElementById('input-end-date');
      return;
    }
    this.dates.date.element = document.getElementById('input-date');
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

  clearCalendar() {
    Object.keys(this.dates).forEach((item) => {
      this.dates[item].date = undefined;
      this.dates[item].dateLabel = undefined;
    });
    this.isDisabledConfirmButton = true;
    this.hasDateInFields = false;
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDateInCalendar();
    this.setVisibleIconClose(false);
    this.closeCalendar();
  }

  setDateInCalendar() {
    this.calendar.goToDate(
      this.selectedDate.monthNumber,
      this.selectedDate.year
    );
    this.renderCalendarDays();
  }

  setFocusOnClickInput(currentInput?: string) {
    this.calendarElement.style.display = 'block';
    if (this.isDateRange) {
      this.currentFieldDate =
        currentInput === 'input-end-date' ? 'endDate' : 'startDate';

      if (!currentInput) {
        this.dates.startDate.element.focus();
        return;
      }

      this.dates[this.currentFieldDate].element.focus();
      return;
    }

    this.currentFieldDate = 'date';
    this.dates.date.element.focus();
  }

  actionClickIcon() {
    if (this.isVisibleIconClose) {
      this.clearCalendar();
      return;
    }

    this.setFocusOnClickInput('input-end-date');
  }

  closeCalendar() {
    this.calendarElement.style.display = 'none';
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

  isCurrentCalendarMonth() {
    return (
      this.calendar.month.number === this.selectedDate.monthNumber &&
      this.calendar.year === this.selectedDate.year
    );
  }

  getWeekDaysElementStrings() {
    return this.calendar.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }

  chipEvents(event, days: number) {
    if (!this.dates.startDate.date) {
      this.dates.startDate.date = this.selectedDate;
      this.dates.startDate.dateLabel = this.selectedDate.format('YYYY-MM-DD');
    }

    const newEndDate = new Day(
      this.addDaysToDate(this.dates.startDate.date.format('YYYY,MM,DD'), days),
      this.lang
    );
    this.dates.endDate.date = newEndDate;
    this.dates.endDate.dateLabel = newEndDate.format('YYYY-MM-DD');
    this.calendar.goToDate(newEndDate.monthNumber, newEndDate.year);
    this.renderCalendarDays();
  }

  addDaysToDate(date, days) {
    const res = new Date(date);
    res.setDate(res.getDate() - 1 + days);
    return res;
  }
}
