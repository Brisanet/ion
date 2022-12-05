import { AvatarComponent } from './avatar.component';
import { IonIconComponent } from '../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from '../defaultImage.directive';

@NgModule({
  declarations: [AvatarComponent, IonIconComponent, DefaultImageDirective],
  imports: [CommonModule],
  exports: [AvatarComponent, IonIconComponent],
})
export class AvatarModule {}
