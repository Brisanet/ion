import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { ControlEvent } from '../control-picker/control-picker.component';

@Component({
  selector: 'ion-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @Input() pickerMode: 'datepicker' | 'rangepicker' = 'datepicker';

  showDatepicker = false;
  currentMonth = '';
  currentYear = '2022';
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

  constructor() {
    //
  }

  ngOnInit(): void {
    this.currentMonth = this.months[0];
    this.currentYear = '2022';
  }

  toggleVisibleCalendar(visible: boolean): void {
    this.showDatepicker = visible;
  }

  ngAfterViewInit(): void {
    document.addEventListener('mouseup', (e: SafeAny) => {
      const calendarContaiener =
        document.getElementsByClassName('container-calendar')[0];
      if (calendarContaiener && !calendarContaiener.contains(e.target)) {
        this.toggleVisibleCalendar(false);
      }
    });
  }

  events({ event }: ControlEvent): void {
    if (event.type === 'changeMonth') {
      this.currentMonth = this.months[event.value];
    }

    if (event.type === 'changeYear') {
      this.currentYear = event.value;
    }
  }
}
