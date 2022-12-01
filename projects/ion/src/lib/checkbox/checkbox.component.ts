import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  SimpleChange,
} from '@angular/core';

export interface CheckBoxProps {
  label?: string;
  disabled?: boolean;
  state?: CheckBoxStates;
  ionClick?: EventEmitter<CheckBoxEvent>;
}

enum CheckBoxEvent {
  checked = 'checked',
  enabled = 'unchecked',
  indeterminate = 'indeterminate',
}

export type CheckBoxStates = keyof typeof CheckBoxEvent;

const stateChange = {
  enabled: 'checked',
  checked: 'enabled',
  indeterminate: 'enabled',
};

@Component({
  selector: 'ion-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() label?: string;
  @Input() state: CheckBoxStates = 'enabled';
  @Input() disabled = false;

  @Output() ionClick = new EventEmitter();

  @ViewChild('checkBox', { static: true }) checkBox: ElementRef;

  private actions = {
    indeterminate: this.setIndeterminate.bind(this),
    checked: this.setChecked.bind(this),
    enabled: this.setEnabled.bind(this),
  };

  setState(options = { emitEvent: true }): void {
    this.actions[this.state](options);
  }

  changeState(): void {
    this.state = stateChange[this.state] as CheckBoxStates;
    this.setState();
  }

  clearIndeterminate(): void {
    this.checkBox.nativeElement.indeterminate = false;
  }

  setEnabled(options: { emitEvent: boolean }): void {
    this.checkBox.nativeElement.checked = false;
    this.checkBox.nativeElement.enabled = true;
    this.clearIndeterminate();
    if (options.emitEvent) this.emitEvent();
  }

  setIndeterminate(options: { emitEvent: boolean }): void {
    this.checkBox.nativeElement.indeterminate = true;
    if (options.emitEvent) this.emitEvent();
  }

  setChecked(options: { emitEvent: boolean }): void {
    this.checkBox.nativeElement.checked = true;
    this.clearIndeterminate();
    if (options.emitEvent) this.emitEvent();
  }

  emitEvent(): void {
    this.ionClick.emit({ state: CheckBoxEvent[this.state] });
  }

  stateInputChanged(state: SimpleChange): boolean {
    return (
      state && !state.firstChange && state.previousValue !== state.currentValue
    );
  }

  disabledInputChanged(disabled: SimpleChange): boolean {
    return disabled && disabled.previousValue !== disabled.currentValue;
  }

  setDisabled(): void {
    this.checkBox.nativeElement.disabled = this.disabled;
  }

  ngOnInit(): void {
    this.setState({ emitEvent: false });
    this.setDisabled();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { state, disabled } = changes;

    if (this.stateInputChanged(state)) {
      this.setState();
    }
    if (this.disabledInputChanged(disabled)) {
      this.setDisabled();
    }
  }
}
