import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { IonIconComponent } from '../icon/icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from '../badge/badge.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    IonIconComponent,
    DropdownComponent,
    BadgeComponent,
    InputComponent,
  ],
  exports: [ButtonComponent, IonIconComponent, BadgeComponent, InputComponent],
  imports: [CommonModule, FormsModule],
})
export class ButtonModule {}
