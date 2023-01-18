import { UpdateLabelCalendar } from './date-picker-calendar/date-picker-calendar.component';
import { AfterViewInit, Component, Input } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { ControlEvent } from '../control-picker/control-picker.component';

@Component({
  selector: 'ion-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatepickerComponent implements AfterViewInit {
  @Input() pickerMode: 'datepicker' | 'rangepicker' = 'datepicker';

  showDatepicker = false;
  calendarMonth: string;
  calendarYear: string;
  currentMonth: string;
  currentYear: string;
  currentDate: string;
  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  calendarControlAction: string;
  goToMonth: string;
  goToYear: string;
  constructor() {
    //
  }

  toggleVisibleCalendar(visible: boolean): void {
    this.showDatepicker = visible;
  }

  ngAfterViewInit(): void {
    document.addEventListener('mouseup', (e: SafeAny) => {
      const calendarContainer =
        document.getElementsByClassName('container-calendar')[0];
      if (calendarContainer && !calendarContainer.contains(e.target)) {
        this.toggleVisibleCalendar(false);
      }
    });
  }

  events({ event }: ControlEvent): void {
    if (event.type === 'changeMonth') {
      this.currentMonth = this.months[event.value];
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
}
