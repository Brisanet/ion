import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonPopoverComponent } from './component/popover.component';
import { IonPopoverDirective } from './popover.directive';
import { IonDividerModule } from '../divider/divider.module';
import { IonSharedModule } from '../shared.module';

@NgModule({
  declarations: [IonPopoverComponent, IonPopoverDirective],
  imports: [CommonModule, IonDividerModule, IonSharedModule],
  exports: [IonPopoverDirective],
  entryComponents: [IonPopoverComponent],
})
export class IonPopoverModule {}
