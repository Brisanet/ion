import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonPopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  declarations: [IonPopoverComponent, PopoverDirective],
  imports: [CommonModule],
  exports: [PopoverDirective],
  entryComponents: [IonPopoverComponent],
})
export class PopoverModule {}
