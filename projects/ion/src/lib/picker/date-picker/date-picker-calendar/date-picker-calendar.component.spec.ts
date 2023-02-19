import { fireEvent, render, screen } from '@testing-library/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeAny } from '../../../utils/safe-any';
import {
  DatePickerCalendarComponent,
  DatePickerCalendarComponentProps,
} from './date-picker-calendar.component';
import { Calendar } from './../../core/calendar';
import { IonButtonModule } from './../../../button/button.module';

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
    imports: [IonButtonModule],
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

  it('should fire an event when clicking the day button', async () => {
    const clickEvent = jest.fn();
    await sut({
      events: {
        emit: clickEvent,
      } as SafeAny,
    });
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[0]);
    expect(clickEvent).toHaveBeenCalled();
  });
});

describe('DatePickerCalendar: calendarControlAction', () => {
  let component: DatePickerCalendarComponent;
  let fixture: ComponentFixture<DatePickerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerCalendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerCalendarComponent);
    component = fixture.componentInstance;
  });

  it('should call ngDoCheck', () => {
    jest.spyOn(component, 'ngDoCheck').mockImplementation();
    fixture.detectChanges();
    expect(component.ngDoCheck).toHaveBeenCalled();
  });

  it.each(['previousYear', 'previousMonth', 'nextMonth', 'nextYear'])(
    'should call (%s)',
    (
      controlAction: 'previousYear' | 'previousMonth' | 'nextMonth' | 'nextYear'
    ) => {
      component.calendarControlAction = controlAction;
      const spy = jest.spyOn(component, controlAction);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }
  );

  it('should emit updateLabelCalendar', (done) => {
    const spy = jest.spyOn(component.updateLabelCalendar, 'emit');
    component.calendar = new Calendar(2023, 1);
    component.tempRenderDays();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith({
        month: component.calendar.month.name,
        year: String(component.calendar.year),
      });
      done();
    }, 200);
  });
});
