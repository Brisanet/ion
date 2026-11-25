import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  CalendarDirection,
  DatePickerLayout,
  DatePickerSize,
} from '../../../../../../../ion/src/lib/core/types/datepicker';
import { IonDatepickerComponent } from '../../../../../../../ion/src/lib/picker/date-picker/date-picker.component';
import { IonButtonComponent } from '../../../../../../../ion/src/lib/button/button.component';
type SandboxStatus = 'default' | 'valid' | 'invalid' | 'disabled';

@Component({
  selector: 'app-text-input-range-gallery',
  standalone: true,
  imports: [IonDatepickerComponent, IonButtonComponent],
  templateUrl: './text-input-range-gallery-component.html',
  styleUrls: ['./text-input-range-gallery-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputRangeGalleryComponent {
  readonly singleLayouts: DatePickerLayout[] = ['default', 'joined'];
  readonly rangeLayouts: DatePickerLayout[] = ['default', 'split'];
  readonly sizes: DatePickerSize[] = ['base', 'large'];
  readonly statuses: SandboxStatus[] = ['default', 'valid', 'invalid', 'disabled'];
  readonly directions: { label: string; value: CalendarDirection }[] = [
    { label: 'Bottom Left', value: CalendarDirection.bottomLeft },
    { label: 'Bottom Right', value: CalendarDirection.bottomRight },
    { label: 'Top Left', value: CalendarDirection.topLeft },
    { label: 'Top Right', value: CalendarDirection.topRight },
  ];

  readonly CalendarDirection = CalendarDirection;

  readonly preselectedSingleDate: string[] = ['10/11/2026'];
  readonly preselectedRangeDates: string[] = ['10/11/2026', '25/11/2026'];

  selectedValues = signal<Record<string, string>>({});

  sandboxRange = signal<boolean>(false);
  sandboxLayout = signal<DatePickerLayout>('default');
  sandboxSize = signal<DatePickerSize>('base');
  sandboxStatus = signal<SandboxStatus>('default');
  sandboxDirection = signal<CalendarDirection>(CalendarDirection.bottomLeft);
  sandboxBlockWeekends = signal<boolean>(false);
  sandboxIsoFormat = signal<boolean>(false);
  sandboxResetKey = signal<number>(0);
  sandboxLastEvent = signal<string>('Aguardando interação...');

  availableLayouts = computed<DatePickerLayout[]>(() =>
    this.sandboxRange() ? this.rangeLayouts : this.singleLayouts,
  );

  readonly disableWeekends = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  setSandboxRange(isRange: boolean): void {
    if (this.sandboxRange() === isRange) return;

    this.sandboxRange.set(isRange);
    const allowed = isRange ? this.rangeLayouts : this.singleLayouts;
    if (!allowed.includes(this.sandboxLayout())) {
      this.sandboxLayout.set('default');
    }

    this.sandboxResetKey.update((k) => k + 1);
    this.sandboxLastEvent.set('Aguardando interação...');
  }

  setSandboxLayout(layout: DatePickerLayout): void {
    if (this.availableLayouts().includes(layout)) {
      this.sandboxLayout.set(layout);
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

  toggleSandboxIsoFormat(): void {
    this.sandboxIsoFormat.update((v) => !v);
    this.sandboxResetKey.update((k) => k + 1);
    this.sandboxLastEvent.set('Aguardando interação...');
  }
}