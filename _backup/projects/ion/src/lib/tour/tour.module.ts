import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonButtonModule } from '../button/button.module';
import { IonPopoverModule } from '../popover/popover.module';
import { IonTourBackdropComponent } from './tour-backdrop';
import { IonTourStepDirective } from './tour-step.directive';
import { IonTourService } from './tour.service';

@NgModule({
  declarations: [IonTourBackdropComponent, IonTourStepDirective],
  entryComponents: [IonTourBackdropComponent],
  providers: [IonTourService],
  imports: [CommonModule, IonPopoverModule, IonButtonModule],
  exports: [IonTourStepDirective],
})
export class IonTourModule {}
