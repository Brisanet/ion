import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from './button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { IonBadgeComponent } from '../badge/badge.component';
import { IonInputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonIconComponent,
    IonDropdownComponent,
    IonBadgeComponent,
    IonInputComponent,
  ],
  exports: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonDropdownComponent,
    IonInputComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ButtonModule {}
