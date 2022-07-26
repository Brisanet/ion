import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';
import { HeadingComponent } from './typograpry';

@NgModule({
  declarations: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    HeadingComponent,
  ],
  imports: [CommonModule],
  exports: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    HeadingComponent,
  ],
})
export class IonModule {}
