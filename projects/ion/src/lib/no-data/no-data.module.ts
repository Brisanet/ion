import { NgModule } from '@angular/core';
import { IonNoDataComponent } from './no-data.component';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonNoDataComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonNoDataComponent],
})
export class IonNoDataModule {}
