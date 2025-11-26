import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButtonProps } from '../core/types';
import { IconDirection, IconType } from '../core/types/icon';
import { InputType } from '../core/types/input';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';

@Component({
  selector: 'ion-input',
  standalone: true,
  imports: [CommonModule, FormsModule, IonIconComponent, IonButtonComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class IonInputComponent {
  placeholder = input<string>();
  button = input<string>('Button');
  iconInput = input<IconType>();
  disabled = input<boolean>(false);
  iconDirection = input<IconDirection>();
  valid = input<boolean>();
  invalid = input<boolean>();
  errorMsg = input<string>();
  inputButton = input<boolean>(false);
  inputButtonConfig = input<IonButtonProps>();
  inputType = input<InputType>('text');
  clearButton = input<boolean>(false);
  readonly = input<boolean>(false);
  maxLength = input<string | number | null>(null);

  // Use model() for two-way binding with ngModel
  value = model<string>('');

  valueChange = output<string>();
  clickButton = output<void>();

  // Computed property for clear button visibility
  isClearButtonVisible = computed(() => {
    return this.clearButton() && this.value().length > 0;
  });

  constructor() {
    // Set default button size if not provided
    effect(() => {
      const config = this.inputButtonConfig();
      if (config && !config.size) {
        // Note: We can't directly mutate the input, but we can ensure default in template
      }
    });
  }

  onModelChange(value: string): void {
    console.log('DEBUG: onModelChange', value);
    this.value.set(value);
    this.valueChange.emit(value);
  }

  handleClick(): void {
    this.clickButton.emit();
  }

  clearInput(): void {
    this.onModelChange('');
  }
}
