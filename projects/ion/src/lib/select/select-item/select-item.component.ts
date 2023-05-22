import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class IonSelectItemComponent {
  @Input() label = '';
}
