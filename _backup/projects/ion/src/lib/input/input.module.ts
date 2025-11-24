import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInputComponent } from './input.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonInputComponent],
})
export class IonInputModule {}
