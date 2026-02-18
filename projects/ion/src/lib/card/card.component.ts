
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ion-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCardComponent {}
