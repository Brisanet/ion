import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonBadgeComponent } from './badge.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonBadgeComponent],
})
export class IonBadgeModule {}
