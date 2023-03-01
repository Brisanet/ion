import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from './icon.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonIconComponent],
})
export class IonIconModule {}
