import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../../../utils/safe-any';
import { IonDatePickerCalendarComponentProps } from '../../core/calendar-model';
import { IonButtonModule } from './../../../button/button.module';
import { Calendar } from './../../core/calendar';
import { IonDatePickerCalendarComponent } from './date-picker-calendar.component';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { Day } from '../../core/day';
import { arrangeDates } from '../../../utils/datePicker';

const mockDisableFutureDate = jest
  .fn()
  .mockImplementation((currrDate: Date) => {
    const mockPresentDay = new Date('2024-05-02T03:00:00');
    return currrDate > mockPresentDay;
  });
const events = jest.fn();

const defaultComponent: IonDatePickerCalendarComponentProps = {
  events: {
    emit: events,
  } as SafeAny,
};

const sut = async (customProps = defaultComponent): Promise<void> => {
  await render(IonDatePickerCalendarComponent, {
    componentProperties: customProps,
    declarations: [],
    imports: [IonButtonModule],
  });
};

describe('IonDatePickerCalendarComponent', () => {
  it('should render 28 days in the calendar when the date is 2015-02-01', async () => {
    const date = ['2015-02-01'];
    await sut({ currentDate: date });
    const buttonsDay = await screen.findAllByRole('button');
    expect(buttonsDay.length).toBe(28);
    expect(await screen.findByTestId('2015-02-01')).toBeTruthy();
    expect(await screen.findByTestId('2015-02-28')).toBeTruthy();
  });

  it('should render 35 days in the calendar when the date is 2023-08-01', async () => {
    const date = ['2023-08-01'];
    await sut({ currentDate: date });
    const buttonsDay = await screen.findAllByRole('button');
    expect(buttonsDay.length).toBe(35);
    expect(await screen.findByTestId('2023-08-01')).toBeTruthy();
    expect(await screen.findByTestId('2023-08-31')).toBeTruthy();
  });

  it('should render 42 days in the calendar when the date is 2023-08-01', async () => {
    const date = ['2018-09-01'];
    await sut({ currentDate: date });
    const buttonsDay = await screen.findAllByRole('button');
    expect(buttonsDay.length).toBe(42);
    expect(await screen.findByTestId('2018-09-01')).toBeTruthy();
    expect(await screen.findByTestId('2018-09-30')).toBeTruthy();
  });

  it('should has current day class in calendar', async () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const dayFormatted = day > 0 && day < 10 ? '0' + day : day;
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    await sut();
    expect(
      await screen.findByTestId(`${year}-${month}-${dayFormatted}`)
    ).toHaveClass('today');
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
    const datePickerCalendar = new IonDatePickerCalendarComponent();
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
    const datePickerCalendar = new IonDatePickerCalendarComponent();
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

  it('should disable only day buttons that match the rule of disabledDate', async () => {
    await sut({
      currentDate: ['2024-05-02'],
      disabledDate: mockDisableFutureDate,
    });
    expect(screen.getByTestId('container-2024-05-02')).not.toHaveClass(
      'disabled'
    );
    expect(screen.getByTestId('container-2024-05-03')).toHaveClass('disabled');
  });

  it('should not fire an event when clicking a disabled day button', async () => {
    const clickEvent = jest.fn();
    await sut({
      currentDate: ['2024-05-02'],
      disabledDate: mockDisableFutureDate,
      events: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(screen.getByTestId('2024-05-03'));
    expect(clickEvent).not.toHaveBeenCalled();
  });
});

describe('DatePickerCalendar: calendarControlAction', () => {
  let component: IonDatePickerCalendarComponent;
  let fixture: ComponentFixture<IonDatePickerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IonDatePickerCalendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonDatePickerCalendarComponent);
    component = fixture.componentInstance;
  });

  it('should call ngOnChanges', () => {
    component.ngOnInit();
    const action = 'previousYear';
    component.calendarControlAction = action;
    const changes: SimpleChanges = {
      calendarControlAction: new SimpleChange(undefined, action, false),
    };
    jest.spyOn(component, 'ngOnChanges');
    component.ngOnChanges(changes);
    expect(component.ngOnChanges).toHaveBeenCalled();
  });

  it.each(['previousYear', 'previousMonth', 'nextMonth', 'nextYear'])(
    'should call (%s)',
    (
      controlAction: 'previousYear' | 'previousMonth' | 'nextMonth' | 'nextYear'
    ) => {
      component.ngOnInit();
      component.calendarControlAction = controlAction;
      const changes: SimpleChanges = {
        calendarControlAction: new SimpleChange(
          undefined,
          controlAction,
          false
        ),
      };
      jest.spyOn(component, 'ngOnChanges');
      const spy = jest.spyOn(component, controlAction);
      component.ngOnChanges(changes);
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

  it('should call arrangeDates if initiate with a selected date', () => {
    const firstDay = new Day(new Date('2024-01-18'));
    const secondDay = new Day(new Date('2024-01-04'));
    component.selectedDays = [firstDay, secondDay];
    component.ngOnInit();
    arrangeDates(component.selectedDays);
    expect(component.selectedDays).toEqual([secondDay, firstDay]);
  });
});

describe('Range Picker', () => {
  it('should fire an event when select an range of days', async () => {
    const clickEvent = jest.fn();
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    await sut({
      rangePicker: true,
      events: {
        emit: clickEvent,
      } as SafeAny,
    });
    const initialDay = screen.findByTestId(`${year}-${month}-01`);
    const finalDay = screen.findByTestId(`${year}-${month}-03`);
    fireEvent.click(await initialDay);
    fireEvent.click(await finalDay);
    expect(clickEvent).toHaveBeenCalled();
  });

  it('should has current range date selected when started with values', async () => {
    const clickEvent = jest.fn();
    const initialDate = '2023-11-01';
    const finalDate = '2023-11-03';
    await sut({
      rangePicker: true,
      currentDate: [initialDate, finalDate],
      events: {
        emit: clickEvent,
      } as SafeAny,
    });
    expect(await screen.findByTestId(initialDate)).toHaveClass('selected');
    expect(await screen.findByTestId(finalDate)).toHaveClass(
      'final-range-selected'
    );
  });

  it('should has between range class in days inside range', async () => {
    const clickEvent = jest.fn();
    const initialDate = '2023-11-04';
    const finalDate = '2023-11-12';
    const betweenDate = 'container-' + '2023-11-06';
    await sut({
      rangePicker: true,
      currentDate: [initialDate, finalDate],
      events: {
        emit: clickEvent,
      } as SafeAny,
    });
    expect(await screen.findByTestId(betweenDate)).toHaveClass('between-range');
  });
});
