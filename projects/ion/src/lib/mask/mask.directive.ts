import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { MASK_PATTERNS, MaskPattern } from './mask.patterns';

@Directive({
  selector: '[bnMask]',
  standalone: true,
})
export class BnMaskDirective {
  private el = inject(ElementRef);
  bnMask = input<string | MaskPattern>('');

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    const mask = this.getMask();

    if (!mask) return;

    const formattedValue = this.applyMask(value, mask);
    input.value = formattedValue;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // We could handle caret position here if needed for a smoother experience
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const pastedText = clipboardData.getData('text');
    const mask = this.getMask();

    if (!mask) return;

    event.preventDefault();
    const formattedValue = this.applyMask(pastedText, mask);
    const input = event.target as HTMLInputElement;
    input.value = formattedValue;
    // Trigger input event to update ngModel/FormControl
    input.dispatchEvent(new Event('input'));
  }

  private getMask(): string {
    const maskInput = this.bnMask();
    if (!maskInput) return '';
    return MASK_PATTERNS[maskInput as MaskPattern] || (maskInput as string);
  }

  private applyMask(value: string, mask: string): string {
    if (!value) return '';

    const hasAlphanumeric = mask.includes('X');
    const cleanValue = hasAlphanumeric
      ? value.replace(/[^a-zA-Z0-9]/g, '')
      : value.replace(/\D/g, '');

    let formattedValue = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
      const maskChar = mask[i];
      if (maskChar === '#' || maskChar === 'X') {
        formattedValue += cleanValue[valueIndex];
        valueIndex++;
      } else {
        formattedValue += maskChar;
      }
    }

    return formattedValue;
  }
}
