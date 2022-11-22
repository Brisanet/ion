import { Component, Input } from '@angular/core';

export interface IndicatorProps {
  type: string;
  label: string;
  value?: string;
  percent?: string;
}
@Component({
  selector: 'ion-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent {
  @Input() label: string;
  @Input() type: string;
  @Input() value?: string;
  @Input() percent?: string;
}
