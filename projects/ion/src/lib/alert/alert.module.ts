import { AlertCustomBodyComponent } from './mocks/alert-custom-body.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAlertComponent } from './alert.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonAlertComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonAlertComponent],
  entryComponents: [AlertCustomBodyComponent],
})
export class IonAlertModule {}
