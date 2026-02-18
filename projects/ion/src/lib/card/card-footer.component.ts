
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ion-card-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="card-ion-footer">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCardFooterComponent {}
