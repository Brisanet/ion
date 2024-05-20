const january = 0;
const oneDay = 1;
const dayInMilliseconds = 86400000;
const totalDaysOfTheWeek = 7;
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
    if (!date) {
      date = new Date();
    }

    this.Date = date;
    this.date = date.getDate();
    this.day = date.toLocaleString(this.lang, { weekday: 'long' });
    this.dayNumber = date.getDay() + 1;
    this.dayShort = date.toLocaleString(this.lang, { weekday: 'short' });
    this.year = date.getFullYear();
    this.yearShort = date.toLocaleString(this.lang, { year: '2-digit' });
    this.month = date.toLocaleString(this.lang, { month: 'long' });
    this.monthShort = date.toLocaleString(this.lang, { month: 'short' });
    this.monthNumber = date.getMonth() + 1;
    this.timestamp = date.getTime();
    this.week = this.getWeekNumber(date);
  }

  getWeekNumber(date: Date): number {
    const firstDayOfTheYear = new Date(date.getFullYear(), january, oneDay);
    const pastDaysOfYear = (date.getTime() - oneDay) / dayInMilliseconds;

    return Math.ceil(
      (pastDaysOfYear + firstDayOfTheYear.getDay() + oneDay) /
        totalDaysOfTheWeek
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
