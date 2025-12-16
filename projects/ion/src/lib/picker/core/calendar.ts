import { Day } from './day';
import { isLeapYear } from './is-leap-year';
import { Month } from './month';

const TOTAL_MONTHS = 12;
const DECEMBER = 11;

export class Calendar {
  today: Day;
  month: Month;
  year: number;
  weekDays = Array.from({ length: 7 });
  [Symbol.iterator]!: () => Generator<Month>;

  constructor(
    year: number | null = null,
    public monthNumber: number | null = null,
    public lang = 'default'
  ) {
    this.today = new Day(undefined, lang);

    this.year = year ?? this.today.year;

    this.month = new Month(
      new Date(this.year, (this.monthNumber ?? this.today.monthNumber) - 1),
      this.lang
    );

    this[Symbol.iterator] = function* () {
      let number = 1;
      yield this.getMonth(number);
      while (number < TOTAL_MONTHS) {
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

  getMonth(monthNumber: number): Month {
    return new Month(new Date(this.year, monthNumber - 1), this.lang);
  }

  getPreviousMonth(): Month {
    if (this.month.number === 1) {
      return new Month(new Date(this.year - 1, DECEMBER), this.lang);
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
    const targetMonth = monthNumber ?? 11;
    this.month = new Month(new Date(this.year, targetMonth), this.lang);
  }

  goToNextYear(monthNumber?: number): void {
    this.year += 1;
    this.month = new Month(new Date(this.year, monthNumber ?? 0), this.lang);
  }

  goToNextMonth(): void {
    if (this.month.number === 12) {
      this.goToNextYear();
      return;
    }

    this.month = new Month(new Date(this.year, this.month.number), this.lang);
  }

  goToPreviousMonth(): void {
    if (this.month.number === 1) {
      this.goToPreviousYear();
      return;
    }

    this.month = new Month(
      new Date(this.year, this.month.number - 2),
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
