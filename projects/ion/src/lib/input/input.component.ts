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
import { InputSize, InputTheme, InputType } from '../core/types/input';
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
    '[class.pointer-focus]': 'pointerFocus()',
    '(pointerdown)': 'onPointerDown()',
    '(keydown)': 'onKeyDown($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class IonInputComponent {
  private static nextId = 0;
  public uniqueId = `ion-input-${IonInputComponent.nextId++}`;

  // Variações e Slots Visuais
  size = input<InputSize>('base');
  theme = input<InputTheme>('primary');
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
  validMsg = input<string>('');
  maxLength = input<string | number | null>(null);

  // Ícones e Ações
  iconInput = input<IconType>('');
  iconDirection = input<IconDirection | undefined>(undefined);
  leftIcon = input<string>('');
  rightIcon = input<string>('');
  clearButton = input<boolean>(false);
  inputButton = input<boolean>(false);
  inputButtonConfig = input<IonButtonProps | undefined>(undefined);
  iconTrailingAriaLabel = input<string>('Action');

  // Two-way binding
  value = model<string>('');
  passwordVisible = signal(false);
  passwordAnnouncement = signal<string>('');
  pointerFocus = signal<boolean>(false);

  // Eventos de saída
  valueChange = output<string>();
  clickButton = output<void>();
  clickIconTrailing = output<void>();
  

  internalButtonSize = computed(() => (this.size() === 'large' ? 'lg' : 'md'));

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

  hasMaxLength = computed(
    () =>
      this.maxLength() !== null &&
      this.maxLength() !== undefined &&
      this.maxLength() !== '',
  );

  describedBy = computed(() => {
    const ids: string[] = [];

    if (this.invalid() && this.errorMsg()) {
      ids.push(`${this.uniqueId}-error`);
    } else if (this.helperText()) {
      ids.push(`${this.uniqueId}-helper`);
    }

    if (this.hasMaxLength()) {
      ids.push(`${this.uniqueId}-counter`);
    }

    return ids.length ? ids.join(' ') : null;
  });
  
  effectiveInputType = computed(() =>
    this.inputType() === 'password' && this.passwordVisible()
      ? 'text'
      : this.inputType(),
  );
  resolvedLeftIcon = computed(() =>
    this.leftIcon() || (this.iconDirection() === 'left' ? this.iconInput() : ''),
  );

  resolvedRightIcon = computed(() =>
    this.rightIcon() || (this.iconDirection() === 'right' ? this.iconInput() : ''),
  );
  onChange(val: string): void {
    this.valueChange.emit(val);
  }

  public handleClick(): void {
    this.clickButton.emit();
  }

  public onClickTrailingIcon(): void {
    this.clickIconTrailing.emit();
  }

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

  public togglePasswordVisibility(): void {
    if (this.disabled()) return;

    this.passwordVisible.update((visible) => {
      const next = !visible;
      this.passwordAnnouncement.set(
        next ? 'Botão de alternância ligado. Senha visivel' : 'Botão de altenância desligado. Senha invisivel',
      );
      return next;
    });
  }

  public clearInput(inputModel: NgModel): void {
    inputModel.control.setValue('');
    this.value.set('');
    this.onChange('');
  }

  isClearButtonVisible = computed(
  () =>
    this.clearButton() &&
    !this.disabled() &&
    !this.readonly() &&
    Boolean(this.value()),
  );
}