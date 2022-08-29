import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { Calendar } from './calendar';
import { Day } from './day';
@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input() format: string;
  @Input() visible = false;
  @Input() isDateRanges = true;
  @Input() initialDate: string;
  @Output() date = new EventEmitter<{
    date?: string;
    startDate?: string;
    endDate?: string;
  }>();
  selectedDate: Day;
  monthYear: string;
  calendar: Calendar;
  lang: string;
  calendarElement: HTMLElement;
  selectedDayElement;
  chips = {
    sevenDays: false,
    fifteenDays: false,
    twentyOneDays: false,
  };
  dateLabel: string;
  startDate: string;
  startDateLabel: string;
  endDate: string;
  endDateLabel: string;
  isVisibleIconClose = false;

  constructor() {
    this.lang = window.navigator.language;
  }

  ngAfterViewInit(): void {
    const el = document.getElementById('date');

    if (el) {
      el.addEventListener('mouseover', () => {
        if (this.dateLabel) {
          this.isVisibleIconClose = true;
        }
      });

      el.addEventListener('mouseleave', () => {
        this.isVisibleIconClose = false;
      });

      el.addEventListener('click', ($event) => {
        const isIconTrash = ($event.target as SafeAny).id === 'ion-icon-trash';

        if (isIconTrash) {
          this.calendarInitialState();
        }
      });
    }
  }

  ngOnInit() {
    this.calendarInitialState();
  }

  calendarInitialState() {
    if (this.initialDate) {
      this.initialDate = this.initialDate.replace('-', ',');
    }
    this.dateLabel = '';
    const date = this.initialDate ? new Date(this.initialDate) : new Date();

    this.selectedDate = new Day(date, this.lang);

    this.calendar = new Calendar(
      this.selectedDate.year,
      this.selectedDate.monthNumber,
      this.lang
    );

    this.renderCalendarDays();

    if (this.visible) {
      document.getElementById('calendar').style.display = 'block';
    }
  }

  toggle() {
    this.visible = !this.visible;
    this.isCurrentCalendarMonth();
    this.calendar.goToDate(
      this.selectedDate.monthNumber,
      this.selectedDate.year
    );
    this.renderCalendarDays();

    if (this.visible) {
      document.getElementById('calendar').style.display = 'block';
    } else {
      document.getElementById('calendar').style.display = 'none';
    }
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

  updatedMonthYear() {
    this.monthYear = `${this.calendar.month.name} - ${this.calendar.year}`;
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

  getMonthDaysGrid() {
    const firstDayOfTheMonth = this.calendar.month.getDay(1);
    const prevMonth = this.calendar.getPreviousMonth();
    const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
    // const totalDays = 42;
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

  updateMonthDays() {
    setTimeout(() => {
      const monthDaysElement = document.getElementById('month-days');
      monthDaysElement.innerHTML = '';

      (this.getMonthDaysGrid() as Day[]).forEach((day) => {
        const btnDay = document.createElement('button');
        btnDay.className = 'month-day';
        btnDay.textContent = day && day.date ? day.date : '';
        btnDay.addEventListener('click', () => this.selectDay(btnDay, day));
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

  selectDay(el, day) {
    if (!day) return;

    this.selectedDate = day;

    if (day.monthNumber !== this.calendar.month.number) {
      this.previousMonth();
    } else {
      el.classList.add('selected');
      this.selectedDayElement.classList.remove('selected');
      this.selectedDayElement = el;
    }

    this.dateLabel = day.format(this.format || 'YYYY-MM-DD');
    this.date.emit({ date: this.dateLabel });
    this.updateMonthDays();
    this.toggle();
  }

  isSelectedDate(date) {
    return (
      date.date === this.selectedDate.date &&
      date.monthNumber === this.selectedDate.monthNumber &&
      date.year === this.selectedDate.year
    );
  }

  renderCalendarDays() {
    this.updatedMonthYear();
    this.updateMonthDays();
  }

  selectDateRanges(numberOfDays: number) {
    if (numberOfDays === 7) {
      this.chips.fifteenDays = false;
      this.chips.twentyOneDays = false;
    }

    if (numberOfDays === 15) {
      this.chips.sevenDays = false;
      this.chips.twentyOneDays = false;
    }

    if (numberOfDays === 21) {
      this.chips.sevenDays = false;
      this.chips.fifteenDays = false;
    }
  }
}
