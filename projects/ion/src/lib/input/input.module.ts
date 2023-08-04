import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInputComponent } from './input.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IonInputComponent],
})
export class IonInputModule {}
