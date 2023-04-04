import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class IonSelectComponent implements OnInit {
  @Input() disabledToggle = false;
  @Input() showDropdown = true;
  placeholder = 'choose';

  ngOnInit(): void {
    this.placeholder = 'sada';
  }

  toggleDropdown(): void {
    if (this.disabledToggle) {
      this.showDropdown = true;
      return;
    }

    this.showDropdown = !this.showDropdown;
  }
}
