import { Calendar } from './calendar';

describe('Calendar', () => {
  const today = new Date();
  const calendar = new Calendar();
  enum Months {
    january = 1,
    February,
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

  it('deve check if the calendar is set to the current month', () => {
    expect(calendar.year).toBe(today.getFullYear());
    expect(calendar.month.number).toBe(today.getMonth() + 1);
  });

  it('should check if calendar language is default', () => {
    expect(calendar.lang).toContain('default');
  });

  it('deve retornar falso para o ano de 2022', () => {
    const calendar2022 = new Calendar(2022);
    expect(calendar2022.isLeapYear).not.toBeTruthy();
  });

  it('deve retornar verdadeiro para o ano de 2024', () => {
    const calendar2024 = new Calendar(2024);
    expect(calendar2024.isLeapYear).toBeTruthy();
  });

  it('deve retornar o mês de maio de 2022', () => {
    expect(calendar.getMonth(Months.may).number).toBe(5);
  });

  it('deve retornar o mês april', () => {
    const calendarMay = new Calendar(null, Months.may);
    const monthApril = calendarMay.getPreviousMonth();
    expect(monthApril.number).toBe(Months.april);
  });

  it('deve retornar o mês de dezembro 2021', () => {
    const calendarJanuary2022 = new Calendar(2022, Months.january);
    const monthDecember2021 = calendarJanuary2022.getPreviousMonth();
    expect(monthDecember2021.number).toBe(Months.december);
    expect(monthDecember2021.year).toBe(2021);
  });

  it('deve retornar o mês fevereiro', () => {
    const calendarJanuary = new Calendar(2022, Months.january);
    expect(calendarJanuary.getNextMonth().number).toBe(Months.February);
  });

  it('deve retornar o mês de janeiro 2022', () => {
    const calendarDecember2021 = new Calendar(2021, Months.december);
    const calendarJanuary2022 = calendarDecember2021.getNextMonth();
    expect(calendarJanuary2022.number).toBe(Months.january);
    expect(calendarJanuary2022.year).toBe(2022);
  });

  it('deve retornar dezembro de 2022', () => {
    calendar.goToDate(11, 2009);
    expect(calendar.month.number).toBe(11);
    expect(calendar.year).toBe(2009);
  });

  it('deve retornar o ano anterior', () => {
    const previousYear = calendar.year - 1;
    calendar.goToPreviousYear();
    expect(calendar.year).toBe(previousYear);
  });

  it('deve retornar o próximo ano ', () => {
    const nextYear = calendar.year + 1;
    calendar.goToNextYear();
    expect(calendar.year).toBe(nextYear);
  });

  it('deve retornar o mes anterior ', () => {
    calendar.goToDate(Months.january, 2022);
    calendar.goToPreviousMonth();
    expect(calendar.month.number).toBe(Months.december);
  });

  it('deve retornar o mes anterior maio ', () => {
    calendar.goToDate(Months.june, 2022);
    calendar.goToPreviousMonth();
    expect(calendar.month.number).toBe(Months.may);
  });

  it('deve retornar o próximo mês - janeiro ', () => {
    calendar.goToDate(Months.december, 2022);
    calendar.goToNextMonth();
    expect(calendar.month.number).toBe(Months.january);
  });

  it('deve retornar o mes setembro ', () => {
    calendar.goToDate(Months.august, 2022);
    calendar.goToNextMonth();
    expect(calendar.month.number).toBe(Months.september);
  });
});
