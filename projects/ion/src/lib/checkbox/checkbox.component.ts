
import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  CheckBoxStates,
  StateChange,
  CheckBoxEvent,
  CheckboxReturn,
} from '../core/types/checkbox';

@Component({
  selector: 'ion-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class IonCheckboxComponent {
  label = input<string>();
  value = input<string>('');
  state = input<CheckBoxStates>('enabled');
  disabled = input<boolean>(false);

  ionClick = output<CheckboxReturn>();

  checkBox = viewChild.required<ElementRef<HTMLInputElement>>('checkBox');

  private actions = {
    indeterminate: this.setIndeterminate.bind(this),
    checked: this.setChecked.bind(this),
    enabled: this.setEnabled.bind(this),
  };

  constructor() {
    // Initialize state when component is created or state changes
    effect(() => {
      const currentState = this.state();
      const emitEvent = false; // Don't emit on initialization
      this.setState({ emitEvent });
    });

    // Update disabled state when it changes
    effect(() => {
      const isDisabled = this.disabled();
      this.setDisabled(isDisabled);
    });
  }

  setState(options = { emitEvent: true }): void {
    const currentState = this.state();
    this.actions[currentState](options);
  }

  changeState(): void {
    const currentState = this.state();
    const newState = StateChange[currentState] as CheckBoxStates;

    // Update the internal state by calling setState with the new state
    // We need to manually update since we can't directly set input signals
    // The parent component should handle state changes via the ionClick event
    this.actions[newState]({ emitEvent: true });
  }

  clearIndeterminate(): void {
    const checkbox = this.checkBox();
    if (checkbox) {
      checkbox.nativeElement.indeterminate = false;
    }
  }

  setEnabled(options: { emitEvent: boolean }): void {
    const checkbox = this.checkBox();
    if (checkbox) {
      checkbox.nativeElement.checked = false;
      this.clearIndeterminate();
      if (options.emitEvent) this.emitEvent('enabled');
    }
  }

  setIndeterminate(options: { emitEvent: boolean }): void {
    const checkbox = this.checkBox();
    if (checkbox) {
      checkbox.nativeElement.indeterminate = true;
      if (options.emitEvent) this.emitEvent('indeterminate');
    }
  }

  setChecked(options: { emitEvent: boolean }): void {
    const checkbox = this.checkBox();
    if (checkbox) {
      checkbox.nativeElement.checked = true;
      this.clearIndeterminate();
      if (options.emitEvent) this.emitEvent('checked');
    }
  }

  setDisabled(isDisabled: boolean): void {
    const checkbox = this.checkBox();
    if (checkbox) {
      checkbox.nativeElement.disabled = isDisabled;
    }
  }

  emitEvent(state: CheckBoxStates): void {
    const valueToEmit: CheckboxReturn = { state: CheckBoxEvent[state] };
    const currentValue = this.value();
    if (currentValue) {
      valueToEmit.value = currentValue;
    }
    this.ionClick.emit(valueToEmit);
  }
}
