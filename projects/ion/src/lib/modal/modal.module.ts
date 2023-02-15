import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModalService } from './modal.service';
import { IonModalComponent } from './component/modal.component';
import { IonButtonModule } from '../button/button.module';

@NgModule({
  declarations: [IonModalComponent],
  imports: [CommonModule, IonButtonModule],
  exports: [IonModalComponent],
  providers: [IonModalService],
  entryComponents: [IonModalComponent],
})
export class IonModalModule {}
