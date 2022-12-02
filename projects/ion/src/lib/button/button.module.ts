import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { IonIconComponent } from '../icon/icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from '../badge/badge.component';

@NgModule({
  declarations: [
    ButtonComponent,
    IonIconComponent,
    DropdownComponent,
    BadgeComponent,
  ],
  exports: [
    ButtonComponent,
    IonIconComponent,
    BadgeComponent,
    DropdownComponent,
  ],
  imports: [CommonModule],
})
export class ButtonModule {}
