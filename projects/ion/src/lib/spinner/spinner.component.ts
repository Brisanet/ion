import { Component, Input } from '@angular/core';

export type IonSpinnerColor = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'ion-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss'],
})
export class IonSpinnerComponent {
  @Input() size = 24;
  @Input() color: IonSpinnerColor = 'primary';
  @Input() customColor?: string;
}
