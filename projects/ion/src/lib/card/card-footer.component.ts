import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ion-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-ion-footer">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCardFooterComponent {}
