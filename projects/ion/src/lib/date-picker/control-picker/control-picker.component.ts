import { Component, Input, Output, EventEmitter } from '@angular/core';

type TypeEvents =
  | 'previousYear'
  | 'previousMonth'
  | 'nextMonth'
  | 'nextYear'
  | 'changeMonth'
  | 'ChangeYear';

type Events = {
  type: TypeEvents;
  value?: string;
};

export interface ControlEvent {
  event?: Events;
}

export interface ControlPickerComponentProps {
  month: string;
  year: string;
  controlPickerEvent?: EventEmitter<ControlEvent>;
}

@Component({
  selector: 'ion-control-picker',
  templateUrl: './control-picker.component.html',
  styleUrls: ['./control-picker.component.scss'],
})
export class ControlPickerComponent {
  @Input() month: string;
  @Input() year: string;
  @Output() controlPickerEvent: EventEmitter<ControlEvent> =
    new EventEmitter<ControlEvent>();

  showContainerToChooseTheMonth = false;
  months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  constructor() {
    //
  }

  handlePreviousYear(): void {
    this.controlPickerEvent.emit({ event: { type: 'previousYear' } });
  }

  handlePreviousMonth(): void {
    this.controlPickerEvent.emit({ event: { type: 'previousMonth' } });
  }

  handleNextMonth(): void {
    this.controlPickerEvent.emit({ event: { type: 'nextMonth' } });
  }

  handleNextYear(): void {
    this.controlPickerEvent.emit({ event: { type: 'nextYear' } });
  }

  handleChangeMonth(monthNumber: string): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeMonth', value: monthNumber },
    });

    this.toogleVisibleContainerToChooseTheMonth(false);
  }

  toogleVisibleContainerToChooseTheMonth(visible: boolean): void {
    this.showContainerToChooseTheMonth = visible;
  }
}
