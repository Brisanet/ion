import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from './button.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonButtonComponent],
})
export class IonButtonModule {}
