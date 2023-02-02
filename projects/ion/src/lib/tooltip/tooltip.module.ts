import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonTooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [IonTooltipComponent, TooltipDirective],
  imports: [CommonModule],
  exports: [TooltipDirective],
  entryComponents: [IonTooltipComponent],
})
export class TooltipModule {}
