import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAlertComponent } from './alert.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  declarations: [IonAlertComponent],
  imports: [CommonModule, IonSharedModule],
  exports: [IonAlertComponent],
})
export class IonAlertModule {}
