import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from './button/button.component';
import { IonDropdownComponent } from './dropdown/dropdown.component';
import { IonIconComponent } from './icon/icon.component';
import { IonBadgeComponent } from './badge/badge.component';
import { IonInputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonDropdownComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    IonButtonComponent,
    IonDropdownComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
  ],
})
export class IonSharedModule {}
