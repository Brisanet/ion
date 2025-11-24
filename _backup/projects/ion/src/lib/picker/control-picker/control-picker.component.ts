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

export interface IonControlPickerComponentProps {
  month: string;
  year: string;
  controlPickerEvent?: EventEmitter<ControlEvent>;
}

@Component({
  selector: 'ion-control-picker',
  templateUrl: './control-picker.component.html',
  styleUrls: ['./control-picker.component.scss'],
})
export class IonControlPickerComponent {
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
  showContainerToChooseMonth = false;
  showContainerToChooseYear = false;
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

  setVisibleContainerToChooseMonth(visible: boolean): void {
    this.showContainerToChooseMonth = visible;
  }

  handleChangeMonth(monthNumber: string): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeMonth', value: monthNumber },
    });

    this.setVisibleContainerToChooseMonth(false);
  }

  setVisibleContainerToChooseYear(visible: boolean): void {
    this.setRangeYear();
    this.showContainerToChooseYear = visible;
  }

  handleChangeYear(year: string): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeYear', value: year },
    });

    this.setVisibleContainerToChooseYear(false);
  }

  setRangeYear(currentYear?: number): void {
    const maxRangeYear = 7;
    const year = currentYear ? currentYear : this.year;
    this.rangeYear = [];
    const initialYear = Number(year) - maxRangeYear;
    const finalYear = Number(year) + maxRangeYear;

    for (let newYear = initialYear; newYear <= finalYear; newYear++) {
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
