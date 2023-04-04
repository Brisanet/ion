import { SafeAny } from './../utils/safe-any';
import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class IonSelectComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    if (this.disabledToggle) {
      return;
    }

    document.addEventListener('mouseup', (e: SafeAny) => {
      const dropdownContainer = document.getElementsByClassName(
        'ion-select__container-dropdown'
      )[0];
      if (dropdownContainer && !dropdownContainer.contains(e.target)) {
        setTimeout(() => {
          this.showDropdown = false;
        });
      }
    });
  }
}
