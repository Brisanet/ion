
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { IonInputComponent } from '../../../input/input.component';
import { DatePickerLayout, IonButtonProps } from '../../../core/types';
import {
  DatePickerSize,
} from '../../../core/types/datepicker';

export interface IonDatePickerInputComponentProps {
  date?: string | string[];
  layout?: DatePickerLayout;
  rangePicker?: boolean;
  size?: DatePickerSize;
  icon?: boolean;
  placeholder?: string | [string, string];
  disabled?: boolean;
  valid?: boolean | [boolean, boolean];
  invalid?: boolean | [boolean, boolean];
}

@Component({
  selector: 'date-picker-input',
  standalone: true,
  imports: [IonInputComponent],
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.pointer-focus]': 'pointerFocus()',
    '(pointerdown)': 'onPointerDown()',
    '(keydown)': 'onKeyDown($event)',
    '(focusout)': 'onFocusOut($event)',
  }
})
export class IonDatePickerInputComponent {
  date = input<string | string[]>([]);
  layout = input<DatePickerLayout>('default');
  rangePicker = input<boolean>(false);
  size = input<DatePickerSize>('base');
  icon = input<boolean>(true);
  placeholder = input<string | [string, string]>('Selecione a data');
  clearDate = output<void>();
  disabled = input<boolean>(false);
  invalid = input<boolean | [boolean, boolean]>(false);
  valid = input<boolean | [boolean, boolean]>(false);
  pointerFocus = signal<boolean>(false);

  dateParts = computed(() => {
    const date = this.date();
    return Array.isArray(date) ? date : date ? [date] : [];
  });
  startDate = computed(() => this.dateParts()[0] ?? '');
  endDate = computed(() => this.dateParts()[1] ?? '');
  hasDate = computed(() => this.dateParts().length > 0);
  activeLayout = computed<DatePickerLayout>(() => {
    if (this.layout() === 'split' && !this.rangePicker()) {
      return 'default';
    }
    return this.layout();
  });

  singleInputValue = computed(() => {
    const dates = this.dateParts();
    return dates.length > 1 ? `${dates[0]} - ${dates[1]}` : (dates[0] ?? '');
  });

  startPlaceholder = computed(() => {
    const p = this.placeholder();
    return Array.isArray(p) ? p[0] ?? 'Selecione a data' : p;
  });

  endPlaceholder = computed(() => {
    const p = this.placeholder();
    return Array.isArray(p) ? p[1] ?? 'Selecione a data' : p;
  });

  singleInvalid = computed(() => this.rangeStartInvalid() || this.rangeEndInvalid());
  singleValid = computed(
    () => !this.singleInvalid() && (this.rangeStartValid() || this.rangeEndValid())
  );

  rangeStartInvalid = computed(() => {
    const val = this.invalid();
    return Array.isArray(val) ? Boolean(val[0]) : Boolean(val);
  });

  rangeStartValid = computed(() => {
    if (this.rangeStartInvalid()) return false;
    const val = this.valid();
    return Array.isArray(val) ? Boolean(val[0]) : Boolean(val);
  });

  rangeEndInvalid = computed(() => {
    const val = this.invalid();
    return Array.isArray(val) ? Boolean(val[1]) : Boolean(val);
  });

  rangeEndValid = computed(() => {
    if (this.rangeEndInvalid()) return false;
    const val = this.valid();
    return Array.isArray(val) ? Boolean(val[1]) : Boolean(val);
  });

  onPointerDown(): void {
    this.pointerFocus.set(true);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      this.pointerFocus.set(false);
    }
  }

  onFocusOut(event: FocusEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget as Node | null;
    if (!currentTarget?.contains(relatedTarget)) {
      this.pointerFocus.set(false);
    }
  }
  clearButtonConfig = computed<IonButtonProps>(() => ({
    iconType: 'close-solid',
    type: 'ghost',
    size: this.size() === 'large' ? 'lg' : 'md',
  }));

  clearDateValue(): void {
    if(this.disabled()) return;
    this.clearDate.emit();
  }
}
