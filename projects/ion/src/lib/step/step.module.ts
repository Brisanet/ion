import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonStepsComponent } from './step.component';
import { IonIconModule } from '../icon/icon.module';
import { PipesModule } from '../utils/pipes/pipes.module';

@NgModule({
  declarations: [IonStepsComponent],
  imports: [CommonModule, IonIconModule, PipesModule],
  exports: [IonStepsComponent],
})
export class IonStepsModule {}
