import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class IonSelectComponent {
  @Input() disabledToggle = false;
  @Input() showDropdown = false;
  @Input() placeholder = 'choose';
  @Input() search = false;

  toggleDropdown(): void {
    if (this.disabledToggle) {
      this.showDropdown = true;
      return;
    }

    this.showDropdown = !this.showDropdown;
  }
}
