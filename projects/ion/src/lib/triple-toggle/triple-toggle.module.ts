import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonSharedModule } from '../shared.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { IonTripleToggleComponent } from './triple-toggle.component';

@NgModule({
  declarations: [IonTripleToggleComponent],
  imports: [CommonModule, IonSharedModule, IonTooltipModule],
  exports: [IonTripleToggleComponent],
})
export class IonTripleToggleModule {}
