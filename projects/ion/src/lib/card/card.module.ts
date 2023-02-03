import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCardComponent } from './card.component';
import { IonChipModule } from '../chip/chip.module';
import { IonIconModule } from '../icon/icon.module';
import { IonButtonModule } from '../button/button.module';

@NgModule({
  declarations: [IonCardComponent],
  imports: [CommonModule, IonIconModule, IonButtonModule, IonChipModule],
  exports: [IonCardComponent],
})
export class IonCardModule {}
