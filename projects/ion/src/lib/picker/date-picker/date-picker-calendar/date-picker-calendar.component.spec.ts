import { Calendar } from './../../core/calendar';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonModule } from '../../../button/button.module';
import { SafeAny } from '../../../utils/safe-any';
import {
  DatePickerCalendarComponent,
  DatePickerCalendarComponentProps,
} from './date-picker-calendar.component';

const events = jest.fn();

const defaultComponent: DatePickerCalendarComponentProps = {
  events: {
    emit: events,
  } as SafeAny,
};

const sut = async (customProps = defaultComponent): Promise<void> => {
  await render(DatePickerCalendarComponent, {
    componentProperties: customProps,
    declarations: [],
    imports: [ButtonModule],
  });
};

describe('DatePickerCalendarComponent', () => {
  it('should render 28 days in the calendar when the date is 2015-02-01', async () => {
    const date = '2015-02-01';
    await sut({ currentDate: date });
    const buttonsDay = await screen.findAllByRole('button');
    expect(buttonsDay.length).toBe(28);
    expect(await screen.findByTestId('2015-02-01')).toBeTruthy();
    expect(await screen.findByTestId('2015-02-28')).toBeTruthy();
  });

  it('should render 35 days in the calendar when the date is 2023-08-01', async () => {
    const date = '2023-08-01';
    await sut({ currentDate: date });
    const buttonsDay = await screen.findAllByRole('button');
    expect(buttonsDay.length).toBe(35);
    expect(await screen.findByTestId('2023-08-01')).toBeTruthy();
    expect(await screen.findByTestId('2023-08-31')).toBeTruthy();
  });

  it('should render 42 days in the calendar when the date is 2023-08-01', async () => {
    const date = '2018-09-01';
    await sut({ currentDate: date });
    const buttonsDay = await screen.findAllByRole('button');
    expect(buttonsDay.length).toBe(42);
    expect(await screen.findByTestId('2018-09-01')).toBeTruthy();
    expect(await screen.findByTestId('2018-09-30')).toBeTruthy();
  });

  it('should render current month in calendar', async () => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    await sut();
    expect(await screen.findByTestId(`${year}-${month}-01`)).toBeTruthy();
  });

  it('should render the month may when goToMonthInCalendar is 04', async () => {
    const mayMonthNumber = '4';
    const datePickerCalendar = new DatePickerCalendarComponent();
    datePickerCalendar.calendar = new Calendar(2023, 1);
    datePickerCalendar.goToMonthInCalendar = mayMonthNumber;
    datePickerCalendar.tempRenderDays();
    const firstDayOfMay = datePickerCalendar.days.some(
      (day) => day.format('YYYY-MM-DD') === '2023-05-01'
    );
    expect(firstDayOfMay).toBeTruthy();
  });

  it('should render the year 2030 when goToYearInCalendar is 2030', async () => {
    const year2030 = '2030';
    const datePickerCalendar = new DatePickerCalendarComponent();
    datePickerCalendar.calendar = new Calendar(2023, 1);
    datePickerCalendar.goToYearInCalendar = year2030;
    datePickerCalendar.tempRenderDays();
    const firstDayOf2030 = datePickerCalendar.days.some(
      (day) => day.format('YYYY-MM-DD') === '2030-01-01'
    );
    expect(firstDayOf2030).toBeTruthy();
  });
});
