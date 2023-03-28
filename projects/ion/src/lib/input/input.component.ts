import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDirection, IconType } from '../core/types/icon';
import { InputType } from '../core/types/input';

@Component({
  selector: 'ion-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class IonInputComponent {
  @Input() placeholder?: string;
  @Input() button = 'Button';
  @Input() iconInput: IconType;
  @Input() disabled = false;
  @Input() iconDirection?: IconDirection;
  @Input() valid: boolean;
  @Input() invalid: boolean;
  @Input() inputButton? = false;
  @Input() inputIconButton? = false;
  @Input() value = '';
  @Input() inputType: InputType = 'text';
  @Input() clearButton = false;
  @Input() readonly = false;
  @Input() maxLength?: string | number | null = null;
  @Output() valueChange = new EventEmitter<string>();
  @Output() clickButton = new EventEmitter();

  onChange(value: string): void {
    this.valueChange.emit(value);
  }

  public handleClick(): void {
    this.clickButton.emit();
  }

  public clearInput(): void {
    this.value = '';
    this.onChange(this.value);
  }

  public isClearButtonVisible(): boolean {
    return this.clearButton && this.value.length > 0;
  }
}
