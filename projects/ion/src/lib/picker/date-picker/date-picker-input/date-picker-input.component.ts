
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { IonInputComponent } from '../../../input/input.component';
import { DatePickerLayout, IonButtonProps } from '../../../core/types';
import {
  DatePickerSize,
  DatePickerTheme,
} from '../../../core/types/datepicker';

export interface IonDatePickerInputComponentProps {
  date?: string | string[];
  placeholder?: string;
}

@Component({
  selector: 'date-picker-input',
  standalone: true,
  imports: [IonInputComponent],
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonDatePickerInputComponent {
  date = input<string | string[]>([]);
  layout = input<DatePickerLayout>('default');
  rangePicker = input<boolean>(false);
  size = input<DatePickerSize>('base');
  theme = input<DatePickerTheme>('primary');
  icon = input<boolean>(true);
  placeholder = input<string | [string, string]>('Selecione a data');
  clearDate = output<void>();
  disabled = input<boolean>(false);
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
    return Array.isArray(p) ? p[0] : p;
  });

  endPlaceholder = computed(() => {
    const p = this.placeholder();
    return Array.isArray(p) ? p[1] : p;
  });
  
  clearButtonConfig = computed<IonButtonProps>(() => ({
    iconType: 'close-solid',
    type: 'ghost',
    size: 'lg',
  }));

  clearDateValue(): void {
    if(this.disabled()) return;
    this.clearDate.emit();
  }
}
