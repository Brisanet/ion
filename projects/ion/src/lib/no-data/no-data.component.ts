import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class IonNoDataComponent {
  @Input() iconType?: string;
  @Input() label: string;
}
