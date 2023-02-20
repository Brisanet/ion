import { UpdateLabelCalendar } from './date-picker-calendar/date-picker-calendar.component';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { ControlEvent } from '../control-picker/control-picker.component';
import { Day } from '../core/day';

type DateEmitter = {
  day?: Day;
};

type DateEvent = {
  date: string;
};

type FormatDateInput = 'YYYY-MM-DD' | 'DD/MM/YYYY';

export interface IonDatePickerComponentProps {
  format?: string;
  formatInDateInput?: FormatDateInput;
  event?: EventEmitter<DateEvent>;
}
@Component({
  selector: 'ion-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class IonDatepickerComponent implements AfterViewInit {
  @Input() format = 'YYYY-MM-DD';
  @Input() formatInDateInput: FormatDateInput = 'DD/MM/YYYY';
  @Output() event = new EventEmitter<DateEvent>();
  currentDate: string;
  inputDate: string;
  showDatepicker = false;
  calendarMonth: string;
  calendarYear: string;

  calendarControlAction: string;
  goToMonth: string;
  goToYear: string;

  setVisibleCalendar(visible: boolean): void {
    this.showDatepicker = visible;
  }

  ngAfterViewInit(): void {
    document.addEventListener('mouseup', (e: SafeAny) => {
      const calendarContainer =
        document.getElementsByClassName('container-calendar')[0];
      if (calendarContainer && !calendarContainer.contains(e.target)) {
        this.setVisibleCalendar(false);
      }
    });
  }

  events({ event }: ControlEvent): void {
    if (event.type === 'changeMonth') {
      this.goToMonth = event.value;
    }

    if (event.type === 'changeYear') {
      this.goToYear = event.value;
    }

    if (event.type !== 'changeYear' && event.type !== 'changeMonth') {
      this.calendarControlAction = event.type;
      setTimeout(() => {
        this.calendarControlAction = undefined;
      }, 0);
    }
  }

  updateLabelCalendar({ month, year }: UpdateLabelCalendar): void {
    this.calendarMonth = month[0].toLocaleUpperCase() + month.substring(1);
    this.calendarYear = year;
  }

  dateSelected({ day }: DateEmitter): void {
    this.event.emit({
      date: day.format(this.format),
    });
    this.currentDate = day.format('YYYY-MM-DD');
    this.inputDate = day.format(this.formatInDateInput);
    this.showDatepicker = false;
  }

  clearDate(): void {
    this.currentDate = '';
    this.inputDate = '';
  }
}
