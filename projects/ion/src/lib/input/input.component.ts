import {
  Component,
  input,
  output,
  model,
  computed,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
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
  host: {
    '[attr.size]': 'size()',
    '[attr.theme]': 'theme()',
  },
})
export class IonInputComponent {
  private static nextId = 0;
  public uniqueId = `ion-input-${IonInputComponent.nextId++}`;

  // Variações e Slots Visuais
  size = input<'base' | 'large'>('base');
  theme = input<'primary' | 'secondary'>('primary');
  label = input<string | undefined>(undefined);
  prefix = input<string | undefined>(undefined);
  helperText = input<string | undefined>(undefined);

  // Estados e Configurações
  placeholder = input<string>('');
  inputType = input<InputType>('text');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  valid = input<boolean>(false);
  invalid = input<boolean>(false);
  errorMsg = input<string>('');
  maxLength = input<string | number | null>(null);

  // Ícones e Ações
  iconInput = input<IconType>('');
  iconDirection = input<IconDirection | undefined>(undefined);
  clearButton = input<boolean>(false);
  inputButton = input<boolean>(false);
  inputButtonConfig = input<IonButtonProps | undefined>(undefined);
  iconTrailingAriaLabel = input<string>('Action');

  // Two-way binding
  value = model<string>('');
  passwordVisible = signal(false);
  effectiveInputType = computed(() =>
    this.inputType() === 'password' && this.passwordVisible()
      ? 'text'
      : this.inputType(),
  );

  // Eventos de saída
  valueChange = output<string>();
  clickButton = output<void>();
  clickIconTrailing = output<void>();

  // Resolução inteligente do botão integrado (tamanho e tema sincronizados com o input)
  finalButtonConfig = computed(() => {
    const config = this.inputButtonConfig();
    if (!config) return undefined;

    let finalBtnSize = config.size;
    if (!finalBtnSize) {
      finalBtnSize = this.size() === 'large' ? 'lg' : 'md';
    }

    return {
      ...config,
      size: finalBtnSize,
      type: config.type || 'primary',
    } as IonButtonProps;
  });

  onChange(val: string): void {
    this.valueChange.emit(val);
  }

  public handleClick(): void {
    this.clickButton.emit();
  }

  public onClickTrailingIcon(): void {
    this.clickIconTrailing.emit();
  }

  public togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  public clearInput(inputModel: NgModel): void {
    inputModel.control.setValue('');
    this.value.set('');
    this.onChange('');
  }

  public isClearButtonVisible(): boolean {
    return this.clearButton() && this.value().length > 0;
  }
}