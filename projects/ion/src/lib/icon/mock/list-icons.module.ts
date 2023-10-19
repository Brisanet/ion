import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon.component';
import { IonInputComponent } from '../../input/input.component';
import { FormsModule } from '@angular/forms';
import { IonNotificationComponent } from '../../notification/component/notification.component';
import { IonButtonComponent } from '../../button/button.component';
import { IonBadgeComponent } from '../../badge/badge.component';
import { IonDropdownComponent } from '../../dropdown/dropdown.component';
import { IonNoDataComponent } from '../../no-data/no-data.component';

@NgModule({
  declarations: [
    IonInputComponent,
    IonIconComponent,
    IonNotificationComponent,
    IonButtonComponent,
    IonBadgeComponent,
    IonDropdownComponent,
    IonNoDataComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    IonInputComponent,
    IonIconComponent,
    IonNotificationComponent,
    IonButtonComponent,
    IonBadgeComponent,
    IonDropdownComponent,
    IonNoDataComponent,
  ],
})
export class ListIconsMockModule {}
