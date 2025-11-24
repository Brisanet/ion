import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <ion-alert [message]="BodyTemplate"></ion-alert>
      <ng-template #BodyTemplate>
        <div data-testid="ion-alert-custom-body">
          <p [ngStyle]="{ margin: 0 }">
            Custom
            <span [ngStyle]="{ 'font-weight': '700' }">Alert</span>
            message
          </p>
        </div>
      </ng-template>
    </div>
  `,
})
export class AlertCustomBodyComponent {}
