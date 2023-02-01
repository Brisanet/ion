import { InputComponent } from './../input/input.component';
import { IonButtonComponent } from './../button/button.component';
import { DropdownComponent } from './dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBadgeComponent } from '../badge/badge.component';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    InputComponent,
    DropdownComponent,
  ],
  exports: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    InputComponent,
    DropdownComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class DropdownModule {}
