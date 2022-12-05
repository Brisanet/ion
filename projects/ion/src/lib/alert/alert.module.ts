import { IonIconComponent } from '../icon/icon.component';
import { AlertComponent } from './alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [AlertComponent, IonIconComponent],
})
export class AlertModule {}
