import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBadgeComponent } from './badge/badge.component';
import { IonButtonComponent } from './button/button.component';
import { IonDropdownComponent } from './dropdown/dropdown.component';
import { IonIconComponent } from './icon/icon.component';
import { IonInputComponent } from './input/input.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonDropdownComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    IonButtonComponent,
    IonDropdownComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
    ClickOutsideDirective,
  ],
})
export class IonSharedModule {}
