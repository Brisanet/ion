import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './../button/button.module';
import { IonModalComponent } from './../modal/component/modal.component';
import { IonModalService } from './../modal/modal.service';
import { TooltipModule } from './../tooltip/tooltip.module';
import { IonIndicatorComponent } from './indicator.component';

@NgModule({
  declarations: [IonIndicatorComponent, IonModalComponent],
  providers: [IonModalService],
  imports: [CommonModule, ButtonModule, TooltipModule],
  exports: [IonIndicatorComponent],
  entryComponents: [IonModalComponent],
})
export class IonIndicatorModule {}
