import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonBadgeComponent } from './badge.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IonBadgeComponent],
})
export class IonBadgeModule {}
