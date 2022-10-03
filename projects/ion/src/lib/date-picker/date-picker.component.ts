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

export interface IonDatePickerProps {
  isCalendarVisible?: boolean;
  isDateRange?: boolean;
  initialDate?: string;
  lang?: string;
  date?: EventEmitter<DateEmitter>;
}

const sunday = 1;
const saturday = 7;
@Component({
  selector: 'ion-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
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

    this.setRangeDateStyle(day, buttonDay);
    this.setSundayStyle(day, buttonDay);
    this.setSaturdayStyle(day, buttonDay);
    this.setStartDateAndEndDateStyle(day, buttonDay);
  }

  setRangeDateStyle(day: Day, buttonDay: HTMLButtonElement) {
    if (!this.dates.startDate.date || !this.dates.endDate.date) {
      return;
    }

    if (
      day.timestamp > this.dates.startDate.date.timestamp &&
      day.timestamp < this.dates.endDate.date.timestamp
    ) {
      this.addClassElement(buttonDay, 'in-range');
    }
  }

  setSundayStyle(day: Day, buttonDay: HTMLButtonElement) {
    day.dayNumber === sunday && this.addClassElement(buttonDay, 'sunday');
  }

  setSaturdayStyle(day: Day, buttonDay: HTMLButtonElement) {
    day.dayNumber === saturday && this.addClassElement(buttonDay, 'saturday');
  }

  setStartDateAndEndDateStyle(day: Day, buttonDay: HTMLButtonElement) {
    if (this.isSelectedDateButton(day, 'startDate')) {
      this.setStartDateStyle(day, buttonDay);
      return;
    }

    if (this.isSelectedDateButton(day, 'endDate')) {
      this.setEndDateStyle(day, buttonDay);
    }
  }

  setStartDateStyle(day: Day, buttonDay: HTMLButtonElement) {
    this.addClassElement(buttonDay, 'selected-start-date');

    if (!this.hasSelectedDates() || this.isSaturday(day)) {
      return;
    }

    this.addClassElement(buttonDay, 'first-range');
  }

  setEndDateStyle(day: Day, buttonDay: HTMLButtonElement) {
    this.addClassElement(buttonDay, 'selected-end-date');
    buttonDay.setAttribute('data-content', buttonDay.textContent);

    if (!this.hasSelectedDates() || this.isSunday(day)) {
      return;
    }

    this.addClassElement(buttonDay, 'end-range');
  }

  hasSelectedDates = () =>
    !!this.dates.startDate.date && !!this.dates.endDate.date;

  isSelectedDateButton = (day: Day, key: 'startDate' | 'endDate') =>
    day.format('YYYY-MM-DD') === this.dates[key].dateLabel;

  isSunday = (day: Day) => day.dayNumber === sunday;

  isSaturday = (day: Day) => day.dayNumber === saturday;

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
    this.updateDateOnInput();
    this.hasDateInFields = true;
    this.updateMonthDays();
    this.unSelectedChip();

    if (!this.isDateRange) {
      this.emmitEvent();
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
    this.dates[this.currentFieldDate].dateLabel =
      this.selectedDate.format('YYYY-MM-DD');
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
      this.closeCalendar();
      return;
    }

    this.date.emit({ date: this.dates.date.dateLabel });
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

  clearCalendar(closeCalendar = false) {
    this.clearDatesObject();
    this.isDisabledConfirmButton = true;
    this.hasDateInFields = false;
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDateInCalendar();
    this.setVisibleIconClose(false);
    this.unSelectedChip();
    closeCalendar && this.closeCalendar();
  }

  clearDatesObject() {
    Object.keys(this.dates).forEach((item) => {
      this.dates[item].date = undefined;
      this.dates[item].dateLabel = undefined;
    });
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
      this.clearCalendar(true);
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

  getWeekDaysElementStrings() {
    return this.calendar.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }

  selectedChips = {
    sevenDays: false,
    fifteenDays: false,
    twentyOneDays: false,
  };

  chipEvents(event, days: number) {
    if (!event.selected) {
      this.clearCalendar();
      return;
    }

    this.unSelectedChip(
      days === 7 ? 'sevenDays' : days === 15 ? 'fifteenDays' : 'twentyOneDays'
    );

    if (!this.dates.startDate.date) {
      this.dates.startDate.date = this.selectedDate;
      this.dates.startDate.dateLabel = this.selectedDate.format('YYYY-MM-DD');
    }

    this.selectedDate = this.dates.startDate.date;

    const newEndDate = new Day(
      this.addDaysToDate(this.dates.startDate.date.format('YYYY,MM,DD'), days),
      this.lang
    );
    this.dates.endDate.date = newEndDate;
    this.dates.endDate.dateLabel = newEndDate.format('YYYY-MM-DD');
    this.calendar.goToDate(newEndDate.monthNumber, newEndDate.year);
    this.hasDateInFields = true;
    this.isDisabledConfirmButton = false;
    this.renderCalendarDays();
  }

  addDaysToDate(date, days) {
    const res = new Date(date);
    res.setDate(res.getDate() - 1 + days);
    return res;
  }

  unSelectedChip(selectedChip?: 'sevenDays' | 'fifteenDays' | 'twentyOneDays') {
    for (const chip in this.selectedChips) {
      this.selectedChips[chip] = false;
      selectedChip && selectedChip === chip
        ? (this.selectedChips[selectedChip] = true)
        : (this.selectedChips[chip] = false);
    }
  }
}
