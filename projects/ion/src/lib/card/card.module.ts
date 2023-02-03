import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCardComponent } from './card.component';
import { IonSharedModule } from '../shared.module';
import { IonChipModule } from '../chip/chip.module';

@NgModule({
  declarations: [IonCardComponent],
  imports: [CommonModule, IonSharedModule, IonChipModule],
  exports: [IonCardComponent],
})
export class IonCardModule {}
