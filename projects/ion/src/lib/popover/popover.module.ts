import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonPopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';
import { IonDividerModule } from '../divider/divider.module';
import { IonButtonModule } from '../button/button.module';

@NgModule({
  declarations: [IonPopoverComponent, PopoverDirective],
  imports: [CommonModule, IonDividerModule, IonButtonModule],
  exports: [PopoverDirective],
  entryComponents: [IonPopoverComponent],
})
export class IonPopoverModule {}
