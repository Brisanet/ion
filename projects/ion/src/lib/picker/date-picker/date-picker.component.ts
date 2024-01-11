import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonDatePickerComponentProps } from '../../core/types/datepicker';
import { SafeAny } from '../../utils/safe-any';
import { ControlEvent } from '../control-picker/control-picker.component';
import { UpdateLabelCalendar } from '../core/calendar-model';
import { Day } from '../core/day';

const DEFAULT_FINAL_FORMAT = 'YYYY-MM-DD';
const DEFAULT_INPUT_FORMAT = 'DD/MM/YYYY';

@Component({
  selector: 'ion-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class IonDatepickerComponent implements AfterViewInit {
  @Input() format = DEFAULT_FINAL_FORMAT;
  @Input() formatInDateInput: IonDatePickerComponentProps['formatInDateInput'] =
    DEFAULT_INPUT_FORMAT;
  @Input() rangePicker: boolean;
  @Output() event = new EventEmitter<string[]>();
  currentDate: string[];
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

  getFinalFormatDate(data: Day[]): string[] {
    return this.rangePicker
      ? [data[0].format(this.format), data[1].format(this.format)]
      : [data[0].format(this.format)];
  }

  dateSelected(data: Day[]): void {
    this.event.emit(this.getFinalFormatDate(data));
    this.currentDate = this.getFinalFormatDate(data);
    this.inputDate = this.rangePicker
      ? data[0].format(this.formatInDateInput) +
        ' - ' +
        data[1].format(this.formatInDateInput)
      : data[0].format(this.formatInDateInput);
    this.showDatepicker = false;
  }

  clearDate(): void {
    this.currentDate = [];
    this.inputDate = '';
  }
}
