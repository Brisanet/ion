const January = 0;
const FirstDayOfTheYear = 1;
// const DayInMilliseconds = 86400000;
// const TotalDaysOfTheWeek = 7;
export class Day {
  Date: Date;
  date;
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

  constructor(date?: Date, lang = 'default') {
    if (!date) {
      date = new Date();
    }

    this.Date = date;
    this.date = date.getDate();
    this.day = date.toLocaleString(lang, { weekday: 'long' });
    this.dayNumber = date.getDay() + 1;
    this.dayShort = date.toLocaleString(lang, { weekday: 'short' });
    this.year = date.getFullYear();
    this.yearShort = date.toLocaleString(lang, { year: '2-digit' });
    this.month = date.toLocaleString(lang, { month: 'long' });
    this.monthShort = date.toLocaleString(lang, { month: 'short' });
    this.monthNumber = date.getMonth() + 1;
    this.timestamp = date.getTime();
    this.week = this.getWeekNumber(date);
  }

  getWeekNumber(date) {
    const firstDayOfTheYear = new Date(date.getFullYear(), January, 1);
    const pastDaysOfYear = (date - FirstDayOfTheYear) / 86400000;

    return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
  }

  get isToday() {
    return this.isEqualTo(new Date());
  }

  isEqualTo(date) {
    date = date instanceof Day ? date.Date : date;

    return (
      date.getDate() === date.getDate() &&
      date.getMonth() === this.monthNumber - 1 &&
      date.getFullYear() === this.year
    );
  }

  format(formatStr) {
    return formatStr
      .replace(/\bYYYY\b/, this.year)
      .replace(/\bYYY\b/, this.yearShort)
      .replace(/\bWW\b/, this.week.toString().padStart(2, '0'))
      .replace(/\bW\b/, this.week)
      .replace(/\bDDDD\b/, this.day)
      .replace(/\bDDD\b/, this.dayShort)
      .replace(/\bDD\b/, this.date.toString().padStart(2, '0'))
      .replace(/\bD\b/, this.date)
      .replace(/\bMMMM\b/, this.month)
      .replace(/\bMMM\b/, this.monthShort)
      .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, '0'))
      .replace(/\bM\b/, this.monthNumber);
  }
}
