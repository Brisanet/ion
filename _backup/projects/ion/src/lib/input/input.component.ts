import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonButtonProps } from '../core/types';
import { IconDirection, IconType } from '../core/types/icon';
import { InputType } from '../core/types/input';

@Component({
  selector: 'ion-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class IonInputComponent implements OnInit {
  @Input() placeholder?: string;
  @Input() button = 'Button';
  @Input() iconInput: IconType;
  @Input() disabled = false;
  @Input() iconDirection?: IconDirection;
  @Input() valid: boolean;
  @Input() invalid: boolean;
  @Input() errorMsg?: string;
  @Input() inputButton = false;
  @Input() inputButtonConfig?: IonButtonProps;
  @Input() value = '';
  @Input() inputType: InputType = 'text';
  @Input() clearButton = false;
  @Input() readonly = false;
  @Input() maxLength?: string | number | null = null;
  @Output() valueChange = new EventEmitter<string>();
  @Output() clickButton = new EventEmitter();

  ngOnInit(): void {
    this.checkAndSetButtonSize();
  }

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

  private checkAndSetButtonSize(): void {
    if (this.inputButtonConfig && !this.inputButtonConfig.size) {
      this.inputButtonConfig.size = 'md';
    }
  }
}
