import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [IonComponent, ButtonComponent, IonIconComponent],
})
export class IonModule {}
