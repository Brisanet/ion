import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input() label!: string;
  @Input() selected?: boolean = false;
  @Input() disabled?: boolean = false;

  select() {
    this.selected = !this.selected;
  }
}
