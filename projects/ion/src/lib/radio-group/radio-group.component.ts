import { Component, Input } from '@angular/core';

export interface RadioGroupItem {
  label: string;
  id: number;
}

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() radiogroup: Array<RadioGroupItem>;
}
