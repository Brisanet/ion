import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonButtonModule } from '../button/button.module';
import { IonCheckboxModule } from '../checkbox/checkbox.module';
import { IonIconModule } from '../icon/icon.module';
import { IonPaginationModule } from '../pagination/pagination.module';
import { IonPopConfirmModule } from '../popconfirm/popconfirm.module';
import { IonPopoverModule } from '../popover/popover.module';
import { IonSpinnerModule } from '../spinner/spinner.module';
import { IonTagModule } from '../tag/tag.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { IonLinkModule } from './../link/link.module';
import { IonTableComponent } from './table.component';

@NgModule({
  declarations: [IonTableComponent],
  imports: [
    CommonModule,
    IonCheckboxModule,
    IonTagModule,
    IonButtonModule,
    IonIconModule,
    IonPaginationModule,
    IonPopConfirmModule,
    IonPopoverModule,
    IonTooltipModule,
    IonSpinnerModule,
    IonLinkModule,
  ],
  exports: [IonTableComponent],
})
export class IonTableModule {}
