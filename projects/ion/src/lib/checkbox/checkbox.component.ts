import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
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
  @Input() public state: CheckBoxStates = 'enabled';
  @Input() label!: string;
  @Output() public stateChange = new EventEmitter<CheckBoxStates>();

  @Input() public disabled = false;
  @Output() public disabledChange = new EventEmitter<boolean>();

  @Output() ionClick = new EventEmitter();

  @ViewChild('checkBox', { static: true }) public checkBox: ElementRef;

  setState() {
    if (this.state === 'indeterminate') this.setIndeterminate();
    if (this.state === 'checked') this.setChecked();
    if (this.state === 'enabled') this.setEnabled();
  }

  changeState() {
    this.state = stateChange[this.state] as CheckBoxStates;
    this.setState();
  }

  setEnabled() {
    this.checkBox.nativeElement.checked = false;
    this.checkBox.nativeElement.enabled = true;
    this.emitEvent();
  }

  setIndeterminate() {
    this.checkBox.nativeElement.indeterminate = true;
    this.emitEvent();
  }

  setChecked() {
    this.checkBox.nativeElement.checked = true;
    this.emitEvent();
  }

  emitEvent() {
    this.ionClick.emit({ state: CheckBoxEvent[this.state] });
  }

  setDisabled() {
    this.checkBox.nativeElement.disabled = this.disabled;
  }

  checkState() {
    this.setState();
    this.setDisabled();
  }

  ngAfterViewInit(): void {
    this.checkState();
  }

  ngOnChanges() {
    this.checkState();
  }
}
