import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionType } from '../core/types';
import { DividerType } from '../core/types/divider';

@Component({
  selector: 'ion-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class IonDividerComponent {
  label = input<string>('');
  direction = input<DirectionType>('horizontal');
  type = input<DividerType>('solid');
  margin = input<boolean>(false);
}
