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
