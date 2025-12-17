const JANUARY = 0;
const ONE_DAY = 1;
const DAY_IN_MILLISECONDS = 86400000;
const TOTAL_DAYS_OF_THE_WEEK = 7;

export class Day {
  Date: Date;
  date: number;
  day: string;
  dayNumber: number;
  dayShort: string;
  year: number;
  yearShort: string;
  month: string;
  monthShort: string;
  monthNumber: number;
  timestamp: number;
  week: number;
  disabled?: boolean;
  isDayCurrentMonth?: boolean;
  isToday?: boolean;
  isBetweenRange?: boolean;
  isRangeInitialLimit?: boolean;
  isRangeFinalLimit?: boolean;

  constructor(date?: Date, public lang = 'default') {
    const currentDate = date ?? new Date();

    this.Date = currentDate;
    this.date = currentDate.getDate();
    this.day = currentDate.toLocaleString(this.lang, { weekday: 'long' });
    this.dayNumber = currentDate.getDay() + 1;
    this.dayShort = currentDate.toLocaleString(this.lang, { weekday: 'short' });
    this.year = currentDate.getFullYear();
    this.yearShort = currentDate.toLocaleString(this.lang, { year: '2-digit' });
    this.month = currentDate.toLocaleString(this.lang, { month: 'long' });
    this.monthShort = currentDate.toLocaleString(this.lang, { month: 'short' });
    this.monthNumber = currentDate.getMonth() + 1;
    this.timestamp = currentDate.getTime();
    this.week = this.getWeekNumber(currentDate);
  }

  getWeekNumber(date: Date): number {
    const firstDayOfTheYear = new Date(date.getFullYear(), JANUARY, ONE_DAY);
    const pastDaysOfYear = (date.getTime() - ONE_DAY) / DAY_IN_MILLISECONDS;

    return Math.ceil(
      (pastDaysOfYear + firstDayOfTheYear.getDay() + ONE_DAY) / TOTAL_DAYS_OF_THE_WEEK
    );
  }

  format(formatStr: string): string {
    return formatStr
      .replace(/\bYYYY\b/, this.year.toString())
      .replace(/\bYYY\b/, this.yearShort)
      .replace(/\bWW\b/, this.week.toString().padStart(2, '0'))
      .replace(/\bW\b/, this.week.toString())
      .replace(/\bDDDD\b/, this.day)
      .replace(/\bDDD\b/, this.dayShort)
      .replace(/\bDD\b/, this.date.toString().padStart(2, '0'))
      .replace(/\bD\b/, this.date.toString())
      .replace(/\bMMMM\b/, this.month)
      .replace(/\bMMM\b/, this.monthShort)
      .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, '0'))
      .replace(/\bM\b/, this.monthNumber.toString());
  }

  getAriaLabel(): string {
    return this.format('YYYY-MM-DD');
  }
}
