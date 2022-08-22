import { Day } from './day';
import { isLeapYear } from './isLeapYear';
import { Month } from './month';

const totalMonths = 12;
const december = 11;
// const january = 1;

export class Calendar {
  today: Day;
  month: Month;
  year: number;
  weekDays = Array.from({ length: 7 });
  constructor(
    year = null,
    private monthNumber = null,
    private lang = 'default'
  ) {
    this.today = new Day(undefined, lang);

    this.year = year ? year : this.today.year;

    this.month = new Month(
      new Date(this.year, (this.monthNumber || this.today.monthNumber) - 1),
      this.lang
    );

    this[Symbol.iterator] = function* () {
      let number = 1;
      yield this.getMonth(number);
      while (number < totalMonths) {
        ++number;
        yield this.getMonth(number);
      }
    };

    this.weekDays.forEach((_, i) => {
      const day = this.month.getDay(i);
      if (!this.weekDays.includes(day.day)) {
        this.weekDays[day.dayNumber - 1] = day.day;
      }
    });
  }

  get isLeapYear() {
    return isLeapYear(this.year);
  }

  getMonth(monthNumber) {
    return new Month(new Date(this.year, monthNumber - 1), this.lang);
  }

  getPreviousMonth() {
    if (this.month.number === 1) {
      return new Month(new Date(this.year - 1, december), this.lang);
    }

    return new Month(new Date(this.year, this.month.number - 2), this.lang);
  }

  getNextMonth() {
    if (this.month.number === 12) {
      return new Month(new Date(this.year + 1, 0), this.lang);
    }

    return new Month(new Date(this.year, this.month.number + 2), this.lang);
  }

  goToDate(monthNUmber, year) {
    this.month = new Month(new Date(year, monthNUmber - 1), this.lang);
    this.year = year;
  }

  goToPreviousYear() {
    this.year -= 1;
    this.month = new Month(new Date(this.year, 11), this.lang);
  }

  goToNextYear() {
    this.year += 1;
    this.month = new Month(new Date(this.year, 0), this.lang);
  }

  goToNextMonth() {
    if (this.month.number === 12) {
      return this.goToNextYear();
    }

    this.month = new Month(
      new Date(this.year, this.month.number + 1 - 1),
      this.lang
    );
  }

  goToPreviousMonth() {
    if (this.month.number === 1) {
      return this.goToPreviousYear();
    }

    this.month = new Month(
      new Date(this.year, this.month.number - 1 - 1),
      this.lang
    );
  }
}
