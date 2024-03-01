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
import { PipesModule } from '../utils/pipes/pipes.module';
import { IonLinkModule } from './../link/link.module';
import { IonSmartTableComponent } from './smart-table.component';

@NgModule({
  declarations: [IonSmartTableComponent],
  imports: [
    CommonModule,
    IonCheckboxModule,
    IonTagModule,
    IonPopConfirmModule,
    IonPopoverModule,
    IonButtonModule,
    IonIconModule,
    IonPaginationModule,
    PipesModule,
    IonTooltipModule,
    IonSpinnerModule,
    IonLinkModule,
  ],
  exports: [IonSmartTableComponent],
})
export class IonSmartTableModule {}
