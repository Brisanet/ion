import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonButtonModule } from '../button/button.module';
import { IonTourBackdropComponent } from './tour-backdrop';
import { IonTourPopoverComponent } from './tour-popover';
import { IonTourStepDirective } from './tour-step.directive';
import { IonTourService } from './tour.service';

@NgModule({
  declarations: [
    IonTourPopoverComponent,
    IonTourBackdropComponent,
    IonTourStepDirective,
  ],
  entryComponents: [IonTourPopoverComponent, IonTourBackdropComponent],
  providers: [IonTourService],
  imports: [CommonModule, IonButtonModule],
  exports: [IonTourStepDirective],
})
export class IonTourModule {}
