import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInfoBadgeComponent } from './info-badge.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonInfoBadgeComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonInfoBadgeComponent],
})
export class IonInfoBadgeModule {}
