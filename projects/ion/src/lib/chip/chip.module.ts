import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip.component';
import { IonInfoBadgeModule } from '../info-badge/info-badge.module';
import { IonBadgeModule } from '../badge/badge.module';
import { IonIconModule } from '../icon/icon.module';
import { IonDropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [ChipComponent],
  imports: [
    CommonModule,
    IonBadgeModule,
    IonIconModule,
    IonDropdownModule,
    IonInfoBadgeModule,
  ],
  exports: [ChipComponent],
})
export class IonChipModule {}
