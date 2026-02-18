
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonInputComponent } from '../../../input/input.component';
import { IonButtonProps } from '../../../core/types';

export interface IonDatePickerInputComponentProps {
  date?: string;
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
  date = input<string | undefined>('');
  rangePicker = input<boolean>(false);
  placeholder = input<string>('Selecione a data');
  clearDate = output<void>();

  public clearButtonConfig: IonButtonProps = {
    iconType: 'close-solid',
    type: 'secondary',
    size: 'lg',
  };

  clearDateValue(): void {
    this.clearDate.emit();
  }
}
