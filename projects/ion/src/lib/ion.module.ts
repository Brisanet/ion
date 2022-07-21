import { TabComponent } from './tab/tab.component';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonComponent } from './ion.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent, ChipComponent, TabComponent],
  imports: [CommonModule],
  exports: [IonComponent, ButtonComponent, ChipComponent, TabComponent],
})
export class IonModule {}
