import { NgModule } from '@angular/core';
import { IonButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { CommonModule } from '@angular/common';
import { IonDropdownComponent } from './dropdown/dropdown.component';
import { IonBadgeComponent } from './badge/badge.component';
import { IonNoDataComponent } from './no-data/no-data.component';
import { IonInputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
    IonNoDataComponent,
    IonDropdownComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    IonButtonComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
    IonNoDataComponent,
    IonDropdownComponent,
  ],
})
export class SharedModule {}
