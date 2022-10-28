import { Calendar } from './calendar';
import { Month } from './month';

enum Months {
  january = 1,
  february,
  march,
  april,
  may,
  june,
  july,
  august,
  september,
  october,
  november,
  december,
}

describe('Calendar', () => {
  const today = new Date();
  const calendar = new Calendar();

  it('should return a calendar with the current month and year', () => {
    expect(calendar.year).toBe(today.getFullYear());
    expect(calendar.month.number).toBe(today.getMonth() + 1);
  });

  it('should check if calendar language is default', () => {
    expect(calendar.lang).toContain('default');
  });

  it('the 2022 calendar will not be a leap year', () => {
    expect(new Calendar(2022).isLeapYear).not.toBeTruthy();
  });

  it('the 2024 calendar will be a leap year', () => {
    expect(new Calendar(2024).isLeapYear).toBeTruthy();
  });

  it('should return May', () => {
    expect(calendar.getMonth(Months.may).number).toBe(Months.may);
  });

  it('should return December 2021 when executing getPreviousMonth function', () => {
    calendar.goToDate(Months.may, 2021);
    expect(calendar.getPreviousMonth().number).toBe(Months.april);
    expect(calendar.getPreviousMonth().year).toBe(2021);
  });

  it('should return December 2021 when executing getPreviousMonth function', () => {
    calendar.goToDate(Months.january, 2022);
    expect(calendar.getPreviousMonth().number).toBe(Months.december);
    expect(calendar.getPreviousMonth().year).toBe(2021);
  });

  it('should return February 2022 when executing getNextMonth function', () => {
    calendar.goToDate(Months.january, 2022);
    expect(calendar.getNextMonth().number).toBe(Months.february);
    expect(calendar.getNextMonth().year).toBe(2022);
  });

  it('should return January 2022 when executing getNextMonth function', () => {
    calendar.goToDate(Months.december, 2021);
    expect(calendar.getNextMonth().number).toBe(Months.january);
    expect(calendar.getNextMonth().year).toBe(2022);
  });

  it('should return date 11 of 2009 when executing goToDate function', () => {
    calendar.goToDate(Months.november, 2009);
    expect(calendar.month.number).toBe(Months.november);
    expect(calendar.year).toBe(2009);
  });

  it('should return previous year when running goToPreviousYear function', () => {
    const previousYear = calendar.year - 1;
    calendar.goToPreviousYear();
    expect(calendar.year).toBe(previousYear);
  });

  it('should return next year when running goToNextYear function', () => {
    const nextYear = calendar.year + 1;
    calendar.goToNextYear();
    expect(calendar.year).toBe(nextYear);
  });

  it('should return the month of December when executing the goToPreviousMonth function', () => {
    calendar.goToDate(Months.january, 2022);
    calendar.goToPreviousMonth();
    expect(calendar.month.number).toBe(Months.december);
  });

  it('should return the month of May when executing the goToPreviousMonth function', () => {
    calendar.goToDate(Months.june, 2022);
    calendar.goToPreviousMonth();
    expect(calendar.month.number).toBe(Months.may);
  });

  it('should return the month of January when executing the goToNextMonth function', () => {
    calendar.goToDate(Months.december, 2022);
    calendar.goToNextMonth();
    expect(calendar.month.number).toBe(Months.january);
  });

  it('should return the month of September when running goToNextMonth function', () => {
    calendar.goToDate(Months.august, 2022);
    calendar.goToNextMonth();
    expect(calendar.month.number).toBe(Months.september);
  });

  it('should return January 2021 when running goToPreviousYear function', () => {
    const calendar = new Calendar(2022, Months.january);
    calendar.goToPreviousYear(calendar.month.number - 1);
    expect(calendar.year).toBe(2021);
    expect(calendar.monthNumber).toBe(Months.january);
  });
});

describe('calendar months', () => {
  const calendar = new Calendar();
  const totalMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let months: Array<Month> = [];
  for (const month of calendar[Symbol.iterator]()) {
    months = [...months, month];
  }

  it.each([...totalMonths])(
    'should render month %s in calendar',
    async (numberMonth: number) => {
      expect(months[numberMonth - 1].number).toBe(numberMonth);
    }
  );
});
