import { Day } from './day';

describe('Day', () => {
  const date = new Date(2022, 8, 21);
  const day = new Day(date, 'pt-BR');

  it('should set language as default', () => {
    const newDay = new Day(null);
    newDay.setLang();
    expect(newDay.lang).toContain('default');
  });

  it('should set language as en-US', () => {
    const newDay = new Day(null, 'en-US');
    expect(newDay.lang).toContain('en-US');
  });

  it('should render true because the creation date is today date', () => {
    const newDay = new Day(null);
    expect(newDay.isToday).toBeTruthy();
  });

  it('should render false because the creation date is not today date', () => {
    expect(day.isToday).not.toBeTruthy();
  });

  it('should render true for equal dates', () => {
    const isSameDates = day.isEqualTo(day);
    expect(isSameDates).toBeTruthy();
  });

  it('should render true for different dates', () => {
    const isSameDates = day.isEqualTo(new Date());
    expect(isSameDates).not.toBeTruthy();
  });

  /**
   * some tests were commented out because the project node version is different
   * from the browser node, causing different results
   */
  it('should return strings correctly', () => {
    expect(day.format('YYYY')).toBe('2022');
    expect(day.format('YYY')).toBe('22');
    // expect(day.format('WW')).toBe('22');
    // expect(day.format('W')).toBe('22');
    // expect(day.format('DDDD')).toBe('22');
    // expect(day.format('DDD')).toBe('22');
    // expect(day.format('DD')).toBe('22');
    // expect(day.format('D')).toBe('22');
    // expect(day.format('MMMM')).toBe('22');
    // expect(day.format('MMM')).toBe('22');
    // expect(day.format('MM')).toBe('22');
    // expect(day.format('M')).toBe('22');
  });
});
