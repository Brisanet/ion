import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonStepsComponent } from './step.component';
import { IonModule } from '../ion.module';

@NgModule({
  declarations: [IonStepsComponent],
  imports: [CommonModule, IonModule],
  exports: [IonStepsComponent],
})
export class IonStepsModule {}
