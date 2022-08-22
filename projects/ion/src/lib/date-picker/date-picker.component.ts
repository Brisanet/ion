import { Component, Input, OnInit } from '@angular/core';
import { Calendar } from './calendar';
import { Day } from './day';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() format = 'MMM DD, YYYY';
  @Input() visible = false;
  @Input() dateLabel: string;
  date: Day;
  monthYear: string;
  calendar: Calendar;
  lang: string = null;
  calendarElement: HTMLElement;
  selectedDayElement;

  constructor() {
    this.lang = window.navigator.language;
  }

  toggle() {
    this.visible = !this.visible;
    this.isCurrentCalendarMonth();
    this.calendar.goToDate(this.date.monthNumber, this.date.year);
    this.renderCalendarDays();

    if (this.visible) {
      document.getElementById('calendar').style.display = 'block';
    } else {
      document.getElementById('calendar').style.display = 'none';
    }
  }

  ngOnInit() {
    const date = this.dateLabel ? new Date(this.dateLabel) : new Date();
    this.date = new Day(date, this.lang);

    this.calendar = new Calendar(
      this.date.year,
      this.date.monthNumber,
      this.lang
    );

    this.dateLabel = this.date.format(this.format);
    this.renderCalendarDays();

    if (this.visible) {
      document.getElementById('calendar').style.display = 'block';
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
      this.calendar.month.number === this.date.monthNumber &&
      this.calendar.year === this.date.year
    );
  }

  handleClickOut(e) {
    // console.log(this);
    // console.log(e.target);
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
    const totalDays =
      this.calendar.month.numberOfDays + totalLastMonthFinalDays;
    // const totalDays = 42;
    let accuracyTotalDays = 0;

    if (totalDays > 35) {
      accuracyTotalDays = 42;
    } else if (totalDays > 28) {
      accuracyTotalDays = 35;
    } else {
      accuracyTotalDays = 28;
    }
    console.log(accuracyTotalDays);

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
        btnDay.addEventListener('click', (e) => this.selectDay(btnDay, day));
        btnDay.setAttribute('aria-label', day ? day.format(this.format) : '');

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

    this.date = day;

    if (day.monthNumber !== this.calendar.month.number) {
      this.previousMonth();
    } else {
      el.classList.add('selected');
      this.selectedDayElement.classList.remove('selected');
      this.selectedDayElement = el;
    }

    this.dateLabel = day.format(this.format);
    this.updateMonthDays();
    this.toggle();
  }

  isSelectedDate(date) {
    return (
      date.date === this.date.date &&
      date.monthNumber === this.date.monthNumber &&
      date.year === this.date.year
    );
  }

  renderCalendarDays() {
    this.updatedMonthYear();
    this.updateMonthDays();
  }
}
