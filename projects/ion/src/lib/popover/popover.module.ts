import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonPopoverComponent } from './component/popover.component';
import { PopoverDirective } from './popover.directive';
import { IonDividerModule } from '../divider/divider.module';
import { IonSharedModule } from '../shared.module';

@NgModule({
  declarations: [IonPopoverComponent, PopoverDirective],
  imports: [CommonModule, IonDividerModule, IonSharedModule],
  exports: [PopoverDirective],
  entryComponents: [IonPopoverComponent],
})
export class IonPopoverModule {}
