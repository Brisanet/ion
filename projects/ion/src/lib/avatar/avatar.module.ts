import { IonAvatarComponent } from './avatar.component';
import { IonIconComponent } from '../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from '../defaultImage.directive';

@NgModule({
  declarations: [IonAvatarComponent, IonIconComponent, DefaultImageDirective],
  imports: [CommonModule],
  exports: [IonAvatarComponent, IonIconComponent],
})
export class AvatarModule {}
