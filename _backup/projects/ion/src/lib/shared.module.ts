import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBadgeComponent } from './badge/badge.component';
import { IonButtonComponent } from './button/button.component';
import { IonDropdownComponent } from './dropdown/dropdown.component';
import { IonIconComponent } from './icon/icon.component';
import { IonInputComponent } from './input/input.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { IonNoDataComponent } from './no-data/no-data.component';
import { IonSpinnerComponent } from './spinner/spinner.component';
import { IonLinkComponent } from './link/link.component';

@NgModule({
  declarations: [
    IonButtonComponent,
    IonDropdownComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
    ClickOutsideDirective,
    IonNoDataComponent,
    IonSpinnerComponent,
    IonLinkComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    IonButtonComponent,
    IonDropdownComponent,
    IonIconComponent,
    IonBadgeComponent,
    IonInputComponent,
    ClickOutsideDirective,
    IonNoDataComponent,
    IonSpinnerComponent,
    IonLinkComponent,
  ],
})
export class IonSharedModule {}
