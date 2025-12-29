import {
  Component,
  input,
  output,
  model,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IconDirection, IconType } from '../core/types/icon';
import { InputType } from '../core/types/input';
import { IonButtonProps } from '../core/types';

@Component({
  selector: 'ion-input',
  standalone: true,
  imports: [FormsModule, IonIconComponent, IonButtonComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonInputComponent {
  placeholder = input<string>('');
  button = input<string>('Button');
  iconInput = input<IconType>('');
  disabled = input<boolean>(false);
  iconDirection = input<IconDirection | undefined>(undefined);
  valid = input<boolean>(false);
  invalid = input<boolean>(false);
  errorMsg = input<string>('');
  inputButton = input<boolean>(false);
  inputButtonConfig = input<IonButtonProps | undefined>(undefined);
  value = model<string>('');
  inputType = input<InputType>('text');
  clearButton = input<boolean>(false);
  readonly = input<boolean>(false);
  maxLength = input<string | number | null>(null);

  valueChange = output<string>();
  clickButton = output<void>();

  constructor() {
    effect(() => {
      this.checkAndSetButtonSize();
    });
  }

  onChange(value: string): void {
    this.valueChange.emit(value);
  }

  public handleClick(): void {
    this.clickButton.emit();
  }

  public clearInput(): void {
    this.value.set('');
    this.onChange('');
  }

  public isClearButtonVisible(): boolean {
    return this.clearButton() && this.value().length > 0;
  }

  private checkAndSetButtonSize(): void {
    const config = this.inputButtonConfig();
    if (config && !config.size) {
      // Note: We can't mutate the input directly, so this is just for validation
      // The parent should provide a complete config
    }
  }
}
