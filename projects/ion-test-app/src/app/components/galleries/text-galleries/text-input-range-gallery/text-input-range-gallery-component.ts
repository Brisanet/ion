import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  CalendarDirection,
  DatePickerLayout,
  DatePickerSize,
  DatePickerTheme,
} from '../../../../../../../ion/src/lib/core/types/datepicker';
import { IonDatepickerComponent } from '../../../../../../../ion/src/lib/picker/date-picker/date-picker.component';

type SandboxStatus = 'default' | 'valid' | 'invalid' | 'disabled';

@Component({
  selector: 'app-text-input-range-gallery',
  standalone: true,
  imports: [IonDatepickerComponent],
  templateUrl: './text-input-range-gallery-component.html',
  styleUrls: ['./text-input-range-gallery-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputRangeGalleryComponent {
  readonly layouts: DatePickerLayout[] = ['default', 'joined', 'split'];
  readonly sizes: DatePickerSize[] = ['base', 'large'];
  readonly themes: DatePickerTheme[] = ['primary', 'secondary'];
  readonly statuses: SandboxStatus[] = ['default', 'valid', 'invalid', 'disabled'];
  readonly directions: { label: string; value: CalendarDirection }[] = [
    { label: 'Bottom Left', value: CalendarDirection.bottomLeft },
    { label: 'Bottom Right', value: CalendarDirection.bottomRight },
    { label: 'Top Left', value: CalendarDirection.topLeft },
    { label: 'Top Right', value: CalendarDirection.topRight },
  ];

  readonly CalendarDirection = CalendarDirection;

  readonly preselectedRangeDates: string[] = ['10/11/2026', '25/11/2026'];


  selectedValues = signal<Record<string, string>>({});

  sandboxRange = signal<boolean>(true);
  sandboxLayout = signal<DatePickerLayout>('joined');
  sandboxSize = signal<DatePickerSize>('base');
  sandboxTheme = signal<DatePickerTheme>('primary');
  sandboxStatus = signal<SandboxStatus>('default');
  sandboxDirection = signal<CalendarDirection>(CalendarDirection.bottomLeft);
  sandboxBlockWeekends = signal<boolean>(false);
  sandboxLastEvent = signal<string>('Aguardando interação...');

  readonly disableWeekends = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  setSandboxRange(isRange: boolean): void {
    this.sandboxRange.set(isRange);
    if (!isRange) {
      this.sandboxLayout.set('default');
    }
  }

  onDateChange(key: string, dates: string[]): void {
    this.selectedValues.update((current) => ({
      ...current,
      [key]: this.formatDates(dates),
    }));
  }

  onSandboxEvent(dates: string[]): void {
    this.sandboxLastEvent.set(
      dates.length ? JSON.stringify(dates) : '[] (limpo)',
    );
  }

  getSelection(key: string): string {
    return this.selectedValues()[key] || 'nenhuma data';
  }

  private formatDates(dates: string[]): string {
    if (!dates || dates.length === 0) {
      return 'nenhuma data';
    }
    return dates.join(' → ');
  }
}