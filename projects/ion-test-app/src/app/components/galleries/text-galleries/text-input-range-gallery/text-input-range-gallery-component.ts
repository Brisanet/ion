import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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

interface SandboxState {
  range: boolean;
  layout: DatePickerLayout;
  size: DatePickerSize;
  status: SandboxStatus;
  direction: CalendarDirection;
  blockWeekends: boolean;
  isoFormat: boolean;
}

const SANDBOX_STORAGE_KEY = 'ion-text-input-range-gallery-sandbox';

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

  private readonly initialState = this.loadSandboxState();

  sandboxRange = signal<boolean>(this.initialState.range);
  sandboxLayout = signal<DatePickerLayout>(this.initialState.layout);
  sandboxSize = signal<DatePickerSize>(this.initialState.size);
  sandboxStatus = signal<SandboxStatus>(this.initialState.status);
  sandboxDirection = signal<CalendarDirection>(this.initialState.direction);
  sandboxBlockWeekends = signal<boolean>(this.initialState.blockWeekends);
  sandboxIsoFormat = signal<boolean>(this.initialState.isoFormat);
  sandboxLastEvent = signal<string>('Aguardando interação...');

  availableLayouts = computed<DatePickerLayout[]>(() =>
    this.sandboxRange() ? this.rangeLayouts : this.singleLayouts,
  );

  readonly disableWeekends = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  constructor() {
    effect(() => {
      const state: SandboxState = {
        range: this.sandboxRange(),
        layout: this.sandboxLayout(),
        size: this.sandboxSize(),
        status: this.sandboxStatus(),
        direction: this.sandboxDirection(),
        blockWeekends: this.sandboxBlockWeekends(),
        isoFormat: this.sandboxIsoFormat(),
      };
      this.saveSandboxState(state);
    });
  }

  sandboxResetKey = signal<number>(0);

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

  private loadSandboxState(): SandboxState {
    const defaults: SandboxState = {
      range: false,
      layout: 'default',
      size: 'base',
      status: 'default',
      direction: CalendarDirection.bottomLeft,
      blockWeekends: false,
      isoFormat: false,
    };

    if (typeof window === 'undefined' || !window.localStorage) {
      return defaults;
    }

    try {
      const raw = window.localStorage.getItem(SANDBOX_STORAGE_KEY);
      if (!raw) return defaults;

      const parsed = JSON.parse(raw) as Partial<SandboxState>;
      const range = typeof parsed.range === 'boolean' ? parsed.range : defaults.range;
      const allowedLayouts = range ? this.rangeLayouts : this.singleLayouts;
      const layout =
        parsed.layout && allowedLayouts.includes(parsed.layout)
          ? parsed.layout
          : defaults.layout;

      return {
        range,
        layout,
        size: parsed.size && this.sizes.includes(parsed.size) ? parsed.size : defaults.size,
        status:
          parsed.status && this.statuses.includes(parsed.status)
            ? parsed.status
            : defaults.status,
        direction:
          parsed.direction &&
          this.directions.some((d) => d.value === parsed.direction)
            ? parsed.direction
            : defaults.direction,
        blockWeekends:
          typeof parsed.blockWeekends === 'boolean'
            ? parsed.blockWeekends
            : defaults.blockWeekends,
        isoFormat:
          typeof parsed.isoFormat === 'boolean'
            ? parsed.isoFormat
            : defaults.isoFormat,
      };
    } catch {
      return defaults;
    }
  }

  private saveSandboxState(state: SandboxState): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignora erro de quota ou modo privado
    }
  }
}