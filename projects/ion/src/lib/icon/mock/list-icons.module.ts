import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon.component';
import { IonInputComponent } from '../../input/input.component';
import { FormsModule } from '@angular/forms';
import { IonNotificationComponent } from '../../notification/component/notification.component';

@NgModule({
  declarations: [IonInputComponent, IonIconComponent, IonNotificationComponent],
  imports: [CommonModule, FormsModule],
  exports: [IonInputComponent, IonIconComponent, IonNotificationComponent],
})
export class ListIconsMockModule {}
