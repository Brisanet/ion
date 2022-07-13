import { NgModule } from '@angular/core';
import { IonComponent } from './ion.component';
import { ButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [IonComponent, ButtonComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [IonComponent, ButtonComponent, IonIconComponent],
})
export class IonModule {}
