import { IonInputModule } from './../../input/input.module';
import { IonDividerModule } from './../../divider/divider.module';
import { IonButtonModule } from './../../button/button.module';
import { SafeAny } from '../../utils/safe-any';
import { IonDatepickerComponent } from './date-picker.component';
import {
  IonControlPickerComponent,
  TypeEvents,
} from '../control-picker/control-picker.component';
import { IonDatePickerInputComponent } from './date-picker-input/date-picker-input.component';
import { IonDatePickerCalendarComponent } from './date-picker-calendar/date-picker-calendar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Day } from '../core/day';
import { ControlEvent } from '../control-picker/control-picker.component';

describe('DatePickerCalendar', () => {
  let component: IonDatepickerComponent;
  let fixture: ComponentFixture<IonDatepickerComponent>;
  const day = new Day(new Date(2023, 0, 1));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IonDatepickerComponent,
        IonControlPickerComponent,
        IonDatePickerInputComponent,
        IonDatePickerCalendarComponent,
      ],
      imports: [IonButtonModule, IonDividerModule, IonInputModule],
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
    component.dateSelected({ day });
    expect(component.currentDate).toBe('2023-01-01');
    expect(component.inputDate).toBe('01/01/2023');
    expect(component.showDatepicker).not.toBeTruthy();
  });

  it('should clear currentDate and inputDate when call clearDate function', () => {
    component.dateSelected({ day });
    expect(component.currentDate).toBe('2023-01-01');
    expect(component.inputDate).toBe('01/01/2023');
    component.clearDate();
    expect(component.currentDate).toBe('');
    expect(component.inputDate).toBe('');
  });

  it('should set toggleVisibeCalendar for false when dispatch event mouseup', () => {
    const toggleSpy = jest.spyOn(component, 'toggleVisibleCalendar');
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
});
