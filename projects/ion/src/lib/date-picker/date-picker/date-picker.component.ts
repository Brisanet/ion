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
import { SafeAny } from '../../utils/safe-any';
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
  @ViewChild('calendarContainer', { static: true })
  public calendarContaiener: ElementRef<HTMLElement>;
  @ViewChild('monthDaysContainer', { static: true })
  public monthDaysContainer: ElementRef<HTMLElement>;
  @ViewChild('dateContainer', { static: true })
  public dateContainer: ElementRef<HTMLElement>;
  @ViewChild('inputDate', { static: true })
  public inputDate: ElementRef<HTMLElement>;
  @Input()
  isCalendarVisible = false;
  @Input() initialDate: IonDatePickerProps['initialDate'];
  @Input() lang: string;
  @Input() placeholder = 'Data';
  @Input() isRequired = false;
  @Output() events = new EventEmitter<DateEmitter>();
  public showCalendar = false;
  public days: Day[] = [];
  selectedDate: Day;
  monthYear: string;
  calendar: Calendar;
  selectedDayElement: HTMLButtonElement;
  isVisibleIconClose = false;
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
    // this.updateMonthDays();
  }

  updatedMonthYear() {
    this.monthYear = `${this.calendar.month.name} - ${this.calendar.year}`;
  }

  // updateMonthDays() {
  //   if (this.monthDaysContainer) {
  //     this.monthDaysContainer.nativeElement.innerHTML = '';

  //     this.getMonthDaysGrid().forEach((day) => {
  //       this.monthDaysContainer.nativeElement.appendChild(
  //         this.createButtonElementOfTheDay(day)
  //       );
  //     });
  //   }
  // }

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

  getTotalLastMonthFinalDays(): number {
    return this.calendar.month.getDay(1).dayNumber - 1;
  }

  getLastMonthFinalDays(): number {
    return this.calendar.month.getDay(1).dayNumber - 1;
  }

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
    // this.updateMonthDays();
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
    // document.addEventListener('mouseup', (e: SafeAny) => {
    //   if (
    //     this.calendarContaiener &&
    //     !this.calendarContaiener.nativeElement.contains(e.target)
    //   ) {
    //     this.closeCalendar();
    //   }
    // });
    // this.dateField.element = this.inputDate.nativeElement;
    // this.addEventsInDateContainer();
    // if (this.isCalendarVisible) {
    //   this.calendarContaiener.nativeElement.style.display = 'block';
    //   this.dateField.element.focus();
    //   return;
    // }
    // this.calendarContaiener.nativeElement.style.display = 'none';
  }

  addEventsInDateContainer() {
    this.dateContainer.nativeElement.addEventListener(
      'mouseover',
      () => this.dateField.label && this.setVisibleIconClose(true)
    );
    this.dateContainer.nativeElement.addEventListener('mouseleave', () =>
      this.setVisibleIconClose(false)
    );
  }

  setVisibleIconClose(isVisible: boolean) {
    this.isVisibleIconClose = isVisible;
  }

  clearCalendar(closeCalendar = false) {
    this.clearDateField();
    this.selectedDate = new Day(this.getInitialDate(), this.lang);
    this.setDateInCalendar();
    this.setVisibleIconClose(false);
    closeCalendar && this.closeCalendar();
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
  }

  setFocusOnClickInput() {
    this.showCalendar = true;
    this.renderCalendarDays();
    this.tempRenderDays();
    // console.log('showCalendar ->', this.showCalendar);
    // this.calendarContaiener.nativeElement.style.display = 'block';
    // this.dateField.element.focus();
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
    console.log('nextMonth ->');
    this.calendar.goToNextMonth();
    this.renderCalendarDays();
    this.tempRenderDays();
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
