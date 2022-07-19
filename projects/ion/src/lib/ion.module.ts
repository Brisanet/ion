import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonComponent } from './ion.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent, ChipComponent],
  imports: [CommonModule],
  exports: [IonComponent, ButtonComponent, ChipComponent],
})
export class IonModule {}
