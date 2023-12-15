import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModalService } from './modal.service';
import { IonModalComponent } from './component/modal.component';
import { IonButtonModule } from '../button/button.module';
import { IonAlertModule } from '../alert/alert.module';

@NgModule({
  declarations: [IonModalComponent],
  imports: [CommonModule, IonButtonModule, IonAlertModule],
  exports: [IonModalComponent],
  providers: [IonModalService],
  entryComponents: [IonModalComponent],
})
export class IonModalModule {}
