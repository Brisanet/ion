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
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  ionClick?: EventEmitter<CheckBoxEvent>;
}

enum CheckBoxEvent {
  checked = 'checked',
  unchecked = 'unchecked',
  indeterminate = 'indeterminate',
}

@Component({
  selector: 'ion-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements AfterViewInit, OnChanges {
  @Input() public disabled = false;
  @Input() public checked = false;
  @Input() public indeterminate = false;
  @Output() public indeterminateChange = new EventEmitter();
  @Output() ionClick = new EventEmitter();

  @ViewChild('checkBox', { static: true }) public checkBox: ElementRef;

  clickEvent() {
    if (this.disabled) return;
    const element = this.checkBox.nativeElement;
    if (this.indeterminate) {
      element.checked = false;
      this.indeterminate = false;
      this.emitEvent(CheckBoxEvent.unchecked);
    } else if (element.checked) {
      this.emitEvent(CheckBoxEvent.checked);
    } else {
      this.emitEvent(CheckBoxEvent.unchecked);
    }
  }

  emitEvent(event: string) {
    this.ionClick.emit({ state: event });
  }

  setIndeterminate() {
    if (this.checkBox) this.checkBox.nativeElement.indeterminate = true;
  }

  ngAfterViewInit(): void {
    if (this.indeterminate) this.setIndeterminate();
  }

  ngOnChanges() {
    if (this.indeterminate) {
      this.emitEvent(CheckBoxEvent.indeterminate);
      this.setIndeterminate();
    }
  }
}
