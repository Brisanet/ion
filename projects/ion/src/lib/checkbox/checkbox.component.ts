import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CheckBoxProps {
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  ionClick?: EventEmitter<CheckBoxEvent>;
}

interface CheckBoxEvent {
  checked?: boolean;
}

@Component({
  selector: 'ion-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() public disabled?: boolean = false;
  @Input() public checked?: boolean = false;
  @Input() public indeterminate?: boolean = false;
  @Output() ionClick = new EventEmitter();

  handleChange() {
    if (this.disabled) return;
    if (this.indeterminate) this.indeterminate = false;
    this.checked = !this.checked;
    this.ionClick.emit({ checked: this.checked });
  }
}
