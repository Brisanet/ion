import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonStepsComponent } from './step.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonStepsComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonStepsComponent],
})
export class IonStepsModule {}
