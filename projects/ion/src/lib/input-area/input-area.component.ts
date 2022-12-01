import { Component, Input } from '@angular/core';

export interface IonInputAreaProps {
  cols?: string;
  rows?: string;
  placeholder?: string;
}

@Component({
  selector: 'ion-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  @Input() cols = '30';
  @Input() rows = '5';
  @Input() placeholder?: string;
}
