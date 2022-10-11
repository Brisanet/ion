import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';

export interface CheckBoxProps {
  disabled?: boolean;
  state?: CheckBoxStates;
  ionClick?: EventEmitter<CheckBoxEvent>;
}

enum CheckBoxEvent {
  checked = 'checked',
  enabled = 'unchecked',
  indeterminate = 'indeterminate',
}

export type CheckBoxStates = 'checked' | 'enabled' | 'indeterminate';

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
export class CheckboxComponent implements AfterViewInit, OnChanges {
  @Input() state: CheckBoxStates = 'enabled';
  @Output() stateChange = new EventEmitter<CheckBoxStates>();

  @Input() disabled = false;
  @Output() disabledChange = new EventEmitter<boolean>();

  @Output() ionClick = new EventEmitter();

  @ViewChild('checkBox', { static: true }) checkBox: ElementRef;

  setState(): void {
    if (this.state === 'indeterminate') this.setIndeterminate();
    if (this.state === 'checked') this.setChecked();
    if (this.state === 'enabled') this.setEnabled();
  }

  changeState(): void {
    this.state = stateChange[this.state] as CheckBoxStates;
    this.setState();
  }

  setEnabled(): void {
    this.checkBox.nativeElement.checked = false;
    this.checkBox.nativeElement.enabled = true;
    this.emitEvent();
  }

  setIndeterminate(): void {
    this.checkBox.nativeElement.indeterminate = true;
    this.emitEvent();
  }

  setChecked(): void {
    this.checkBox.nativeElement.checked = true;
    this.emitEvent();
  }

  emitEvent(): void {
    this.ionClick.emit({ state: CheckBoxEvent[this.state] });
  }

  setDisabled(): void {
    this.checkBox.nativeElement.disabled = this.disabled;
  }

  checkState(): void {
    this.setState();
    this.setDisabled();
  }

  ngAfterViewInit(): void {
    this.checkState();
  }

  ngOnChanges(): void {
    this.checkState();
  }
}
