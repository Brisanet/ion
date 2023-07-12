import { IonNotificationContainerComponent } from './service/notification.container.component';
import { IonNotificationService } from './service/notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';
import { IonNotificationComponent } from './component/notification.component';

@NgModule({
  declarations: [IonNotificationComponent, IonNotificationContainerComponent],
  imports: [CommonModule, IonIconModule],
  providers: [IonNotificationService],
  exports: [IonNotificationComponent, IonNotificationContainerComponent],
  entryComponents: [
    IonNotificationComponent,
    IonNotificationContainerComponent,
  ],
})
export class IonNotificationModule {}
