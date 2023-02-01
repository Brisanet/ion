import { InputComponent } from './../input/input.component';
import { ButtonComponent } from './../button/button.component';
import { DropdownComponent } from './dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../badge/badge.component';

@NgModule({
  declarations: [
    ButtonComponent,
    IonIconComponent,
    BadgeComponent,
    InputComponent,
    DropdownComponent,
  ],
  exports: [
    ButtonComponent,
    IonIconComponent,
    BadgeComponent,
    InputComponent,
    DropdownComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class DropdownModule {}
