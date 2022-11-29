import { Component, Input } from '@angular/core';

export interface RadioGroupItem {
  label: string;
}

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() radioGroup: Array<RadioGroupItem>;
  @Input() label?: string;
  @Input() checked? = false;
}
