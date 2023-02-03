import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonChipComponent } from './chip.component';
import { IonSharedModule } from '../shared.module';
import { IonInfoBadgeModule } from '../info-badge/info-badge.module';

@NgModule({
  declarations: [IonChipComponent],
  imports: [CommonModule, IonSharedModule, IonInfoBadgeModule],
  exports: [IonChipComponent],
})
export class IonChipModule {}
