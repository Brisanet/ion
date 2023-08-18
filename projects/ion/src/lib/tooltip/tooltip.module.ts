import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonTooltipComponent } from './tooltip.component';
import { IonTooltipDirective } from './tooltip.directive';
import { TooltipService } from './tooltip.service';

@NgModule({
  declarations: [IonTooltipComponent, IonTooltipDirective],
  imports: [CommonModule],
  exports: [IonTooltipDirective],
  entryComponents: [IonTooltipComponent],
  providers: [TooltipService],
})
export class IonTooltipModule {}
