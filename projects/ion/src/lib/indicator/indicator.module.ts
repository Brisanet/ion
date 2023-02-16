import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonIndicatorComponent } from './indicator.component';
import { IonButtonModule } from '../button/button.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { IonModalModule } from '../modal/modal.module';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonIndicatorComponent],
  imports: [
    CommonModule,
    IonButtonModule,
    IonIconModule,
    IonTooltipModule,
    IonModalModule,
  ],
  exports: [IonIndicatorComponent],
})
export class IonIndicatorModule {}
