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
  selected: boolean;
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
  dateLabel = '';
  isVisibleIconClose = false;
  currentFieldDate: string;
  hasDateInFields = false;
  dateFields: DateFields = {
    dateField: {
      element: null,
      date: undefined,
      selected: false,
    },
    startDateField: {
      element: null,
      date: undefined,
      selected: false,
    },
    endDateField: {
      element: null,
      date: undefined,
      selected: false,
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

    if (this.isCalendarVisible) {
      this.openCalendar(this.isDateRanges ? 'field-date' : 'field-start-date');
    }
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

    this.addClassElement(buttonDay, 'month-day');
    this.setAriaLabelInDayElement(buttonDay, day);

    this.isADayOfTheCurrentMonth(day) &&
      this.addClassElement(buttonDay, 'current');

    buttonDay.addEventListener('click', () =>
      this.dispatchActions(buttonDay, day)
    );

    if (this.isSelectedDate(day)) {
      this.addClassElement(buttonDay, 'selected');
      this.selectedDayElement = buttonDay;
    }

    return buttonDay;
  }

  setAriaLabelInDayElement = (el: HTMLButtonElement, day: Day) =>
    el.setAttribute('aria-label', day.format(this.format || 'YYYY-MM-DD'));

  isADayOfTheCurrentMonth = (day: Day) =>
    day.monthNumber === this.calendar.month.number;

  getMonthDaysGrid() {
    const firstDayOfTheMonth = this.calendar.month.getDay(1);
    const prevMonth = this.calendar.getPreviousMonth();
    const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
    const totalDays =
      this.calendar.month.numberOfDays + totalLastMonthFinalDays;
    let accuracyTotalDays = 0;

    if (totalDays > 35) {
      accuracyTotalDays = 42;
    } else if (totalDays > 28) {
      accuracyTotalDays = 35;
    } else {
      accuracyTotalDays = 28;
    }

    const monthList = Array.from<Day>({ length: accuracyTotalDays });

    for (let i = totalLastMonthFinalDays; i < accuracyTotalDays; i++) {
      monthList[i] = this.calendar.month.getDay(
        i + 1 - totalLastMonthFinalDays
      );
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
    }

    return monthList;
  }

  dispatchActions(el: HTMLButtonElement, day: Day) {
    if (!day) return;

    this.selectedDate = day;
    this.addClassElement(el, 'selected');
    this.removeClassElement(this.selectedDayElement, 'selected');
    this.selectedDayElement = el;

    this.formatDateLabel();
    // this.removeClassElement(
    //   this.dateFields[this.currentFieldDate].element,
    //   'selected-field'
    // );
    this.updateDateInField();
    this.hasDateInFields = true;
    this.updateMonthDays();

    if (!this.isDateRanges) {
      this.emmitEvent();
      this.closeCalendar();
    }

    this.setDate();
  }

  formatDateLabel() {
    this.dateLabel = this.selectedDate.format(this.format || 'YYYY-MM-DD');
  }

  updateDateInField() {
    this.dateFields[this.currentFieldDate].date = this.selectedDate.format(
      this.format || 'YYYY-MM-DD'
    );

    if (this.isDateRanges) {
      const inputStartDate = document.getElementById('input-start-date');
      const inputEndDate = document.getElementById('input-end-date');

      if (
        this.dateFields.startDateField.date &&
        this.dateFields.endDateField.date
      ) {
        this.isDisabledConfirmButton = false;
        this.currentFieldDate === 'startDateField'
          ? inputStartDate.focus()
          : inputEndDate.focus();
        return;
      }

      if (this.currentFieldDate === 'startDateField') {
        inputEndDate.focus();
        this.currentFieldDate = 'endDateField';
        return;
      }

      inputStartDate.focus();
      this.currentFieldDate = 'startDateField';
    }

    // if (this.isDateRanges) {
    //   if (
    //     this.dateFields.startDateField.date &&
    //     this.dateFields.endDateField.date
    //   ) {
    //     this.isDisabledConfirmButton = false;
    //     return;
    //   }
    //   this.isDisabledConfirmButton = true;
    //   if (this.currentFieldDate === 'startDateField') {
    //     this.addClassElement(
    //       this.dateFields.endDateField.element,
    //       'selected-field'
    //     );
    //     this.currentFieldDate = 'endDateField';
    //   } else {
    //     this.addClassElement(
    //       this.dateFields.startDateField.element,
    //       'selected-field'
    //     );
    //     this.currentFieldDate = 'startDateField';
    //   }
    // }
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

    this.date.emit({ date: this.dateLabel });
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
    this.dateFields.dateField.element = document.getElementById('field-date');
    this.dateFields.startDateField.element =
      document.getElementById('field-start-date');
    this.dateFields.endDateField.element =
      document.getElementById('field-end-date');

    this.addEvents();
  }

  addEvents() {
    const dateContainer = document.getElementsByClassName('date-container');
    dateContainer[0].addEventListener(
      'mouseover',
      () => this.hasDateInFields && this.setVisibleIconClose(true)
    );
    dateContainer[0].addEventListener('mouseleave', () =>
      this.setVisibleIconClose(false)
    );
  }

  setVisibleIconClose(isVisible: boolean) {
    this.isVisibleIconClose = isVisible;
  }

  clearCalendar() {
    this.dateLabel = '';
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

  openCalendar(fieldDate?: string) {
    // this.currentFieldDate = fieldDate;
    // const inputStartDate = document.getElementById('input-start-date');
    // const inputEndDate = document.getElementById('input-end-date');
    // if(this.dateFields.startDateField.date){

    // }
    // inputStartDate.focus();
    this.calendarElement.style.display = 'block';
    // this.setFocus();
    // const inputStartDate = document.getElementById('input-start-date');
    // inputStartDate.focus();
    this.setSelectedInput();
  }

  setSelectedInput(currentInput?: string) {
    this.calendarElement.style.display = 'block';

    if (this.isDateRanges) {
      this.currentFieldDate =
        currentInput === 'input-end-date' ? 'endDateField' : 'startDateField';

      if (!currentInput) {
        document.getElementById('input-start-date').focus();
        return;
      }
      document.getElementById(currentInput).focus();
      return;
    }

    this.currentFieldDate = 'dateField';
    const inputDate = document.getElementById('input-date');
    inputDate.focus();
  }

  actionClickIcon() {
    if (this.isVisibleIconClose) {
      this.clearCalendar();
      return;
    }

    this.setSelectedInput('input-end-date');
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
