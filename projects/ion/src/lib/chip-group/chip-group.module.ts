import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonChipGroupComponent } from './chip-group.component';
import { IonChipModule } from '../chip/chip.module';
import { IonButtonModule } from '../button/button.module';

@NgModule({
  declarations: [IonChipGroupComponent],
  imports: [CommonModule, IonButtonModule, IonChipModule],
  exports: [IonChipGroupComponent],
})
export class IonChipGroupModule {}
