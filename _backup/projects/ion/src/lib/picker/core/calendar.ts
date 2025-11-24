import { Day } from './day';
import { isLeapYear } from './isLeapYear';
import { Month } from './month';

const totalMonths = 12;
const december = 11;

export class Calendar {
  today: Day;
  month: Month;
  year: number;
  weekDays = Array.from({ length: 7 });
  constructor(year = null, public monthNumber = null, public lang = 'default') {
    this.today = new Day(undefined, lang);

    this.year = year ? year : this.today.year;

    this.month = new Month(
      new Date(this.year, (this.monthNumber || this.today.monthNumber) - 1),
      this.lang
    );

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

  get isLeapYear(): boolean {
    return isLeapYear(this.year);
  }

  getMonth(monthNumber): Month {
    return new Month(new Date(this.year, monthNumber - 1), this.lang);
  }

  getPreviousMonth(): Month {
    if (this.month.number === 1) {
      return new Month(new Date(this.year - 1, december), this.lang);
    }

    return new Month(new Date(this.year, this.month.number - 2), this.lang);
  }

  getNextMonth(): Month {
    if (this.month.number === 12) {
      return new Month(new Date(this.year + 1, 0), this.lang);
    }

    return new Month(new Date(this.year, this.month.number), this.lang);
  }

  goToDate(monthNumber: number, year: number): void {
    this.month = new Month(new Date(year, monthNumber - 1), this.lang);
    this.year = year;
  }

  goToPreviousYear(monthNumber?: number): void {
    this.year -= 1;
    if (monthNumber === 0) {
      monthNumber = 12;
    }

    this.month = new Month(new Date(this.year, monthNumber || 11), this.lang);
  }

  goToNextYear(monthNumber?: number): void {
    this.year += 1;
    this.month = new Month(new Date(this.year, monthNumber || 0), this.lang);
  }

  goToNextMonth(): void {
    if (this.month.number === 12) {
      return this.goToNextYear();
    }

    this.month = new Month(
      new Date(this.year, this.month.number + 1 - 1),
      this.lang
    );
  }

  goToPreviousMonth(): void {
    if (this.month.number === 1) {
      return this.goToPreviousYear();
    }

    this.month = new Month(
      new Date(this.year, this.month.number - 1 - 1),
      this.lang
    );
  }

  getDay(day: number): Day {
    return this.month.getDay(day);
  }

  getLastMonthFinalDays(): number {
    return this.month.getDay(1).dayNumber - 1;
  }

  getWeekDaysElementStrings(): string[] {
    return this.weekDays.map(
      (weekDay) => `${(weekDay as string).substring(0, 3)}`
    );
  }
}
