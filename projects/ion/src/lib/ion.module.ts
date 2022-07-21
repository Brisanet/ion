import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [IonComponent, ButtonComponent, IonIconComponent, ChipComponent],
})
export class IonModule {}
