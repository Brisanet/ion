import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonMessageComponent } from './message.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonMessageComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonMessageComponent],
})
export class IonMessageModule {}
