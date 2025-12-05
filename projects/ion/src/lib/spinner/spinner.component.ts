import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinnerProps } from '../core/types/spinner';

@Component({
  selector: 'ion-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class IonSpinnerComponent {
  size = input<IonSpinnerProps['size']>(24);
  color = input<IonSpinnerProps['color']>('primary');
  customColor = input<IonSpinnerProps['customColor']>();
  text = input<IonSpinnerProps['text']>('');
  textSize = input<IonSpinnerProps['textSize']>('sm');
}
