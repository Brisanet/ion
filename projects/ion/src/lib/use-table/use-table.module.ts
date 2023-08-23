import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonUseTableComponent } from './use-table.component';
import { IonIconModule } from '../icon/icon.module';
import { IonSmartTableModule } from '../smart-table/smart-table.module';

@NgModule({
  declarations: [IonUseTableComponent],
  imports: [CommonModule, IonIconModule, IonSmartTableModule],
  exports: [IonUseTableComponent],
})
export class IonUseTableModule {}
