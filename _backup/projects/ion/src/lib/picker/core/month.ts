import { Day } from './day';
import { isLeapYear } from './isLeapYear';

export class Month {
  day: Day;
  MonthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  February = 2;

  name: string;
  number: number;
  year: number;
  numberOfDays: number;

  constructor(private date?, public lang = 'default') {
    this.day = new Day(this.date, this.lang);

    this.name = this.day.month;
    this.number = this.day.monthNumber;
    this.year = this.day.year;
    this.numberOfDays = this.MonthsSize[this.number - 1];

    if (this.number === this.February) {
      this.numberOfDays += isLeapYear(this.year) ? 1 : 0;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    this[Symbol.iterator] = function* () {
      let number = 1;
      yield this.getDay(number);
      while (number < this.numberOfDays) {
        ++number;
        yield this.getDay(number);
      }
    };
  }

  getDay(date): Day {
    return new Day(new Date(this.year, this.number - 1, date), this.lang);
  }
}
