import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInfoBadgeComponent } from './info-badge.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  declarations: [IonInfoBadgeComponent],
  imports: [CommonModule, IonSharedModule],
  exports: [IonInfoBadgeComponent],
})
export class IonInfoBadgeModule {}
