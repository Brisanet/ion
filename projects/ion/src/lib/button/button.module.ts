import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from './button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { IonBadgeComponent } from '../badge/badge.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonIconComponent,
    IonDropdownComponent,
    IonBadgeComponent,
    InputComponent,
  ],
  exports: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonDropdownComponent,
    InputComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ButtonModule {}
