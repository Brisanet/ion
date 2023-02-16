import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';
import { IonNotificationComponent } from './notification.component';

@NgModule({
  declarations: [IonNotificationComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonNotificationComponent],
})
export class IonNotificationModule {}
