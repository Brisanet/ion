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
    setTimeout(() => {
      const monthDaysElement = document.getElementById('month-days');
      monthDaysElement.innerHTML = '';

      (this.getMonthDaysGrid() as Day[]).forEach((day) => {
        const btnDay = document.createElement('button');
        btnDay.className = 'month-day';
        btnDay.textContent = day && day.date ? day.date : '';
        // btnDay.addEventListener('click', () => this.selectDay(btnDay, day));
        btnDay.addEventListener('click', () =>
          this.dispatchActions(btnDay, day)
        );

        btnDay.setAttribute(
          'aria-label',
          day ? day.format(this.format || 'YYYY-MM-DD') : ''
        );

        if (day) {
          if (day.monthNumber === this.calendar.month.number) {
            btnDay.classList.add('current');
          }

          if (this.isSelectedDate(day)) {
            btnDay.classList.add('selected');
            this.selectedDayElement = btnDay;
          }
        }

        if (monthDaysElement) {
          monthDaysElement.appendChild(btnDay);
        }
      });
    });
  }

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

    const monthList = Array.from({ length: accuracyTotalDays });

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
    this.removeClassElement(
      this.dateFields[this.currentFieldDate].element,
      'selected-field'
    );
    this.updateDateInField();
    this.hasDateInFields = true;
    this.updateMonthDays();

    if (!this.isDateRanges) {
      this.emmitEvent();
      this.closeCalendar();
    }
  }

  formatDateLabel() {
    this.dateLabel = this.selectedDate.format(this.format || 'YYYY-MM-DD');
  }

  updateDateInField() {
    this.dateFields[this.currentFieldDate].date = this.selectedDate.format(
      this.format || 'YYYY-MM-DD'
    );

    if (this.isDateRanges) {
      if (
        this.dateFields.startDateField.date &&
        this.dateFields.endDateField.date
      ) {
        this.isDisabledConfirmButton = false;
        return;
      }
      this.isDisabledConfirmButton = true;
      if (this.currentFieldDate === 'startDateField') {
        this.addClassElement(
          this.dateFields.endDateField.element,
          'selected-field'
        );
        this.currentFieldDate = 'endDateField';
      } else {
        this.addClassElement(
          this.dateFields.startDateField.element,
          'selected-field'
        );
        this.currentFieldDate = 'startDateField';
      }
    }
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
    const fieldsDate = document.getElementsByClassName('field-date');

    for (let i = 0; i < fieldsDate.length; i++) {
      fieldsDate[i].addEventListener(
        'mouseover',
        () => this.hasDateInFields && this.setVisibleIconClose(true)
      );

      fieldsDate[i].addEventListener('mouseleave', () =>
        this.setVisibleIconClose(false)
      );
    }
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

  openCalendar(fieldDate: string) {
    this.currentFieldDate = fieldDate;
    this.calendarElement.style.display = 'block';
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
