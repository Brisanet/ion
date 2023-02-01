import { InputComponent } from './../input/input.component';
import { IonButtonComponent } from './../button/button.component';
import { IonDropdownComponent } from './dropdown.component';
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
    IonDropdownComponent,
  ],
  exports: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    InputComponent,
    IonDropdownComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class DropdownModule {}
