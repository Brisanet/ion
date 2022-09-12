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

type Dates = {
  date?: string;
  startDate?: string;
  endDate?: string;
};

type DateField = {
  element: HTMLElement;
  date: string | undefined;
};

interface DateFields {
  dateField: DateField;
  startDateField: DateField;
  endDateField: DateField;
}
@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input() format: string;
  @Input() isCalendarVisible = false;
  @Input() isDateRanges = false;
  @Input() initialDate: string;
  @Input() lang: string;
  @Output() date = new EventEmitter<Dates>();
  selectedDate: Day;
  monthYear: string;
  calendar: Calendar;
  calendarElement: HTMLElement;
  selectedDayElement: HTMLButtonElement;
  isVisibleIconClose = false;
  currentFieldDate: string;
  hasDateInFields = false;
  dateContainer: HTMLElement;
  dateFields: DateFields = {
    dateField: {
      element: null,
      date: undefined,
    },
    startDateField: {
      element: null,
      date: undefined,
    },
    endDateField: {
      element: null,
      date: undefined,
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
    buttonDay.textContent = day.date.toString();

    this.setStyleButtonDay(buttonDay, day);
    this.setAriaLabelInButtonElementDay(buttonDay, day);

    buttonDay.addEventListener('click', () =>
      this.dispatchActions(buttonDay, day)
    );

    return buttonDay;
  }

  setStyleButtonDay(buttonDay: HTMLButtonElement, day: Day) {
    this.addClassElement(buttonDay, 'month-day');

    this.isADayOfTheCurrentMonth(day) &&
      this.addClassElement(buttonDay, 'current');

    if (this.isSelectedDate(day)) {
      this.addClassElement(
        buttonDay,
        this.isDateRanges ? 'selected-start-date' : 'selected'
      );
      this.selectedDayElement = buttonDay;
    }

    if (this.isDateRanges) {
      if (day.format('YYYY-MM-DD') === this.dateFields.startDateField.date) {
        this.addClassElement(buttonDay, 'selected-start-date');
      }

      if (day.format('YYYY-MM-DD') === this.dateFields.endDateField.date) {
        this.addClassElement(buttonDay, 'selected-end-date');
      }
    }
  }

  setAriaLabelInButtonElementDay = (buttonDay: HTMLButtonElement, day: Day) =>
    buttonDay.setAttribute(
      'aria-label',
      day.format(this.format || 'YYYY-MM-DD')
    );

  isADayOfTheCurrentMonth = (day: Day) =>
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

    if (!this.isDateRanges) {
      this.emmitEvent();
      this.closeCalendar();
    }

    this.setDate();
  }

  updateDateOnInput() {
    this.dateFields[this.currentFieldDate].date = this.selectedDate.format(
      this.format || 'YYYY-MM-DD'
    );

    if (this.isDateRanges) {
      this.setFocusWhenUpdatingADate();
    }
  }

  setFocusWhenUpdatingADate() {
    if (
      this.dateFields.startDateField.date &&
      this.dateFields.endDateField.date
    ) {
      this.isDisabledConfirmButton = false;
      this.currentFieldDate === 'startDateField'
        ? this.dateFields.startDateField.element.focus()
        : this.dateFields.endDateField.element.focus();
      return;
    }

    if (this.currentFieldDate === 'startDateField') {
      this.dateFields.endDateField.element.focus();
      this.currentFieldDate = 'endDateField';
      return;
    }

    this.dateFields.startDateField.element.focus();
    this.currentFieldDate = 'startDateField';
  }

  emmitEvent() {
    if (this.isDateRanges) {
      !this.isDisabledConfirmButton &&
        this.date.emit({
          startDate: this.dateFields.startDateField.date,
          endDate: this.dateFields.endDateField.date,
        });
      return;
    }

    this.date.emit({ date: this.dateFields.dateField.date });
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

      if (this.isDateRanges) {
        this.dateFields.startDateField.element.focus();
        return;
      }
      this.dateFields.dateField.element.focus();
    }
  }

  getHtmlElementsReferences() {
    this.dateContainer = document.getElementById('date-container');
    if (this.isDateRanges) {
      this.dateFields.startDateField.element =
        document.getElementById('input-start-date');
      this.dateFields.endDateField.element =
        document.getElementById('input-end-date');
      return;
    }
    this.dateFields.dateField.element = document.getElementById('input-date');
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
    Object.keys(this.dateFields).forEach((item) => {
      this.dateFields[item].date = undefined;
    });
    this.isDisabledConfirmButton = true;
    this.hasDateInFields = false;
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDate();
    this.setVisibleIconClose(false);
    this.closeCalendar();
  }

  setDate() {
    this.calendar.goToDate(
      this.selectedDate.monthNumber,
      this.selectedDate.year
    );
    this.renderCalendarDays();
  }

  setFocusOnClickInput(currentInput?: string) {
    this.calendarElement.style.display = 'block';
    if (this.isDateRanges) {
      this.currentFieldDate =
        currentInput === 'input-end-date' ? 'endDateField' : 'startDateField';

      if (!currentInput) {
        this.dateFields.startDateField.element.focus();
        return;
      }

      this.dateFields[this.currentFieldDate].element.focus();
      return;
    }

    this.currentFieldDate = 'dateField';
    this.dateFields.dateField.element.focus();
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
}
