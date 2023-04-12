import { Day } from './day';
import { Month } from './month';

describe('Month', () => {
  it('should set language as default', () => {
    const month = new Month();
    expect(month.lang).toContain('default');
  });

  it('should render 28 days to date 2022-02-01', () => {
    const newMonth = new Month(new Date(2022, 1, 1));
    expect(newMonth.numberOfDays).toBe(28);
  });

  it('should render 28 days to date 2022-02-01', () => {
    const newMonth = new Month(new Date(2022, 1, 1));
    expect(newMonth.numberOfDays).toBe(28);
  });

  it('should render 29 days to date 2020-02-01', () => {
    const newMonth = new Month(new Date(2020, 1, 1));

    expect(newMonth.numberOfDays).toBe(29);
  });

  it('should render a Day object with the date 2022-02-15', () => {
    const month = new Month(new Date(2022, 1, 1));
    const fifteenDay = month.getDay(15);
    expect(fifteenDay instanceof Day).toBeTruthy();
    expect(fifteenDay.date).toBe(15);
    expect(fifteenDay.monthNumber).toBe(2);
    expect(fifteenDay.year).toBe(2022);
  });
});

describe('days of the months 2022', () => {
  const numberOfMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const Months = numberOfMonths.map(
    (numberOfMonth) => new Month(new Date(2022, numberOfMonth))
  );

  const totalDaysPerMonth = Months.map((month) => {
    let days = [];
    for (const day of month[Symbol.iterator]()) {
      days = [...days, day];
    }

    return days.length;
  });

  it.each([...numberOfMonths])(
    'should correctly render the number of days for the month %s of 2022',
    async (month) => {
      expect(totalDaysPerMonth[month]).toBe(monthsSize[month]);
    }
  );
});
