import { Component, Input } from '@angular/core';
import { IconType } from '../icon/icon.component';

export interface IndicatorProps {
  type: string;
  label: string;
  icon: string;
  value?: string;
  color?: string;
  percent?: string;
}
@Component({
  selector: 'ion-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent {
  @Input() icon: IconType;
  @Input() label: string;
  @Input() type: string;
  @Input() value?: string;
  @Input() color?: string;
  @Input() percent?: string;
}
