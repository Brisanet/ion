import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonModalModule } from '../modal/modal.module';
import { IonNoDataModule } from '../no-data/no-data.module';
import { IonPopoverModule } from '../popover/popover.module';
import { IonSkeletonModule } from '../skeleton/skeleton.module';
import { IonSpinnerModule } from '../spinner/spinner.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { IonIndicatorComponent } from './indicator.component';

@NgModule({
  declarations: [IonIndicatorComponent],
  imports: [
    CommonModule,
    IonButtonModule,
    IonIconModule,
    IonTooltipModule,
    IonModalModule,
    IonSkeletonModule,
    IonSpinnerModule,
    IonPopoverModule,
    IonNoDataModule,
  ],
  exports: [IonIndicatorComponent],
})
export class IonIndicatorModule {}
