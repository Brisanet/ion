import { Day } from './day';
import { isLeapYear } from './is-leap-year';

export class Month {
  private readonly monthsSize = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];
  private readonly february = 2;

  day: Day;
  name: string;
  number: number;
  year: number;
  numberOfDays: number;
  [Symbol.iterator]!: () => Generator<Day>;

  constructor(
    private date?: Date,
    public lang = 'default',
  ) {
    this.day = new Day(this.date, this.lang);

    this.name = this.day.month;
    this.number = this.day.monthNumber;
    this.year = this.day.year;
    this.numberOfDays = this.monthsSize[this.number - 1];

    if (this.number === this.february) {
      this.numberOfDays += isLeapYear(this.year) ? 1 : 0;
    }

    this[Symbol.iterator] = function* () {
      let number = 1;
      yield this.getDay(number);
      while (number < this.numberOfDays) {
        ++number;
        yield this.getDay(number);
      }
    };
  }

  getDay(date: number): Day {
    return new Day(new Date(this.year, this.number - 1, date), this.lang);
  }
}
