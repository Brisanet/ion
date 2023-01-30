import { Component, Input, Output, EventEmitter } from '@angular/core';

export type TypeEvents =
  | 'previousYear'
  | 'previousMonth'
  | 'nextMonth'
  | 'nextYear'
  | 'changeMonth'
  | 'changeYear';

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
  showContainerToChooseTheMonth = false;
  showContainerToChooseTheYear = false;
  rangeYear: number[] = [];

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

  toogleVisibleContainerToChooseTheMonth(visible: boolean): void {
    this.showContainerToChooseTheMonth = visible;
  }

  handleChangeMonth(monthNumber: string): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeMonth', value: monthNumber },
    });

    this.toogleVisibleContainerToChooseTheMonth(false);
  }

  toogleVisibleContainerToChooseTheYear(visible: boolean): void {
    this.setRangeYear();
    this.showContainerToChooseTheYear = visible;
  }

  handleChangeYear(year: string): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeYear', value: year },
    });

    this.toogleVisibleContainerToChooseTheYear(false);
  }

  setRangeYear(currentyear?: number): void {
    const year = currentyear ? currentyear : this.year;
    this.rangeYear = [];
    const InitialYear = Number(year) - 7;
    const finalYear = Number(year) + 7;

    for (let newYear = InitialYear; newYear <= finalYear; newYear++) {
      this.rangeYear.push(newYear);
    }
  }

  handleShowPreviousYears(): void {
    this.setRangeYear(this.rangeYear[0]);
  }

  handleShowNextYears(): void {
    this.setRangeYear(this.rangeYear[this.rangeYear.length - 1]);
  }
}
