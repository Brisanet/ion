import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { IonButtonComponent } from '../../button/button.component';
import { IonDividerComponent } from '../../divider/divider.component';
import { IonTooltipDirective } from '../../tooltip/tooltip.directive';
import { TooltipPosition } from '../../core/types/tooltip';

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
}

@Component({
  selector: 'ion-control-picker',
  standalone: true,
  imports: [
    CommonModule,
    IonButtonComponent,
    IonTooltipDirective,
    IonDividerComponent,
  ],
  templateUrl: './control-picker.component.html',
  styleUrls: ['./control-picker.component.scss'],
  host: {
    role: 'group',
    'aria-label': 'Datepicker navigation',
  },
})
export class IonControlPickerComponent {
  month = input<string>('');
  year = input<string>('');
  controlPickerEvent = output<ControlEvent>();
  TooltipPosition = TooltipPosition;

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
  showContainerToChooseMonth = signal(false);
  showContainerToChooseYear = signal(false);
  rangeYear = signal<number[]>([]);

  constructor() {
    effect(() => {
      if (this.showContainerToChooseYear()) {
        this.setRangeYear();
      }
    });
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

  setVisibleContainerToChooseMonth(visible: boolean): void {
    this.showContainerToChooseMonth.set(visible);
  }

  handleChangeMonth(monthNumber: number): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeMonth', value: String(monthNumber) },
    });
    this.setVisibleContainerToChooseMonth(false);
  }

  setVisibleContainerToChooseYear(visible: boolean): void {
    this.setRangeYear();
    this.showContainerToChooseYear.set(visible);
  }

  handleChangeYear(year: number): void {
    this.controlPickerEvent.emit({
      event: { type: 'changeYear', value: String(year) },
    });
    this.setVisibleContainerToChooseYear(false);
  }

  setRangeYear(currentYear?: number): void {
    const maxRangeYear = 7;
    const year = currentYear ?? Number(this.year() || new Date().getFullYear());
    const initialYear = year - maxRangeYear;
    const finalYear = year + maxRangeYear;
    const range: number[] = [];

    for (let newYear = initialYear; newYear <= finalYear; newYear++) {
      range.push(newYear);
    }

    this.rangeYear.set(range);
  }

  handleShowPreviousYears(): void {
    const firstYear = this.rangeYear()[0];
    this.setRangeYear(firstYear);
  }

  handleShowNextYears(): void {
    const lastYear = this.rangeYear()[this.rangeYear().length - 1];
    this.setRangeYear(lastYear);
  }
}
