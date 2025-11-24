import { ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';

import { SafeAny } from '../../utils/safe-any';
import {
  ControlEvent,
  TypeEvents,
} from '../control-picker/control-picker.component';
import { Day } from '../core/day';
import { IonButtonModule } from './../../button/button.module';
import { IonDividerModule } from './../../divider/divider.module';
import { IonInputModule } from './../../input/input.module';
import {
  DEFAULT_FINAL_FORMAT,
  IonDatepickerComponent,
} from './date-picker.component';
import { IonDatePickerModule } from './date-picker.module';
import { calculateDuration } from '../../utils';
import { CalendarDirection } from '../../core/types/datepicker';

const previouslyRangeDates = [
  { label: 'Last 7 days', duration: 'P7D', isFuture: false },
  { label: 'Last 15 days', duration: 'P15D', isFuture: false },
  { label: 'Last 31 days', duration: 'P31D', isFuture: false },
];

const posteriorlyRangeDates = [
  { label: 'Next 7 days', duration: 'P7D', isFuture: true },
  { label: 'Next 15 days', duration: 'P15D', isFuture: true },
  { label: 'Next 31 days', duration: 'P31D', isFuture: true },
];

const calendarDirections = Object.values(CalendarDirection);

describe('DatePickerCalendar', () => {
  let component: IonDatepickerComponent;
  let fixture: ComponentFixture<IonDatepickerComponent>;
  const day = new Day(new Date(2023, 0, 1));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonButtonModule,
        IonDividerModule,
        IonInputModule,
        IonDatePickerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonDatepickerComponent);
    component = fixture.componentInstance;
  });

  it('should update calendarMonth and calendarYear when call updateLabelCalendar function ', () => {
    component.updateLabelCalendar({ month: 'january', year: '2022' });
    expect(component.calendarMonth).toBe('January');
    expect(component.calendarYear).toBe('2022');
  });

  it('should update currentDate, InputDate and set showDatePicker for false when call dateSelected function', () => {
    component.dateSelected([day]);
    expect(component.currentDate).toStrictEqual(['2023-01-01']);
    expect(component.inputDate).toBe('01/01/2023');
    expect(component.showDatepicker).not.toBeTruthy();
  });

  it('should clear currentDate and inputDate when call clearDate function', () => {
    component.dateSelected([day]);
    expect(component.currentDate).toStrictEqual(['2023-01-01']);
    expect(component.inputDate).toBe('01/01/2023');
    component.clearDate();
    expect(component.currentDate).toStrictEqual([]);
    expect(component.inputDate).toBe('');
  });

  it('should set toggleVisibeCalendar for false when dispatch event mouseup', () => {
    const toggleSpy = jest.spyOn(component, 'setVisibleCalendar');
    component.showDatepicker = true;
    fixture.detectChanges();
    document.dispatchEvent(new Event('mouseup'));
    expect(toggleSpy).toHaveBeenCalled();
    expect(component.showDatepicker).not.toBeTruthy();
  });

  it('should set goToMonth for 4 when events call with event type = "changeMonth" and value = "4"', () => {
    const event: ControlEvent = {
      event: { type: 'changeMonth', value: '4' },
    };
    component.events(event);
    expect(component.goToMonth).toBe('4');
  });

  it('should set goToYear for 2030 when events call with event type = "changeMonth" and value = "2030"', () => {
    const event: ControlEvent = {
      event: { type: 'changeYear', value: '2030' },
    };
    component.events(event);
    expect(component.goToYear).toBe('2030');
  });

  it.each(['previousYear', 'previousMonth', 'nextMonth', 'nextYear'])(
    'should set calendarControlAction to the type %s',
    (type: TypeEvents, done: SafeAny) => {
      const event: ControlEvent = {
        event: { type },
      };
      component.events(event);
      expect(component.calendarControlAction).toBe(type);
      setTimeout(() => {
        expect(component.calendarControlAction).toBe(undefined);
        done();
      }, 0);
    }
  );

  it.each(calendarDirections)(
    'should render in the %s position',
    async (containerClass) => {
      component.direction = containerClass;
      component.showDatepicker = true;
      fixture.detectChanges();
      expect(screen.getByTestId('container-calendar')).toHaveClass(
        `container-calendar--${containerClass}`
      );
    }
  );

  describe('PreDefinedRangePicker', () => {
    const today = new Date().getTime();
    describe.each(previouslyRangeDates)('Previously Dates', (range) => {
      const durationTime = calculateDuration(range.duration);
      const [todayText, qtdDaysAgo] = [new Date(), today - durationTime].map(
        (date) => new Day(new Date(date)).format(DEFAULT_FINAL_FORMAT)
      );
      it(`should filter for the ${range.label}`, () => {
        const spy = jest.spyOn(component, 'dateSelected');

        component.rangePicker = true;
        component.onSelectPredefinedRange(range);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
        expect(component.currentDate).toEqual([qtdDaysAgo, todayText]);
      });
    });

    describe.each(posteriorlyRangeDates)('Posteriorly Dates', (range) => {
      const durationTime = calculateDuration(range.duration);
      const [todayText, qtdDaysAfter] = [new Date(), today + durationTime].map(
        (date) => new Day(new Date(date)).format(DEFAULT_FINAL_FORMAT)
      );
      it(`should filter for the ${range.label}`, () => {
        const spy = jest.spyOn(component, 'dateSelected');

        component.rangePicker = true;
        component.onSelectPredefinedRange(range);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
        expect(component.currentDate).toEqual([todayText, qtdDaysAfter]);
      });
    });
  });
});
