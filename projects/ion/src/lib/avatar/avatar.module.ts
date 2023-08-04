import { IonAvatarComponent } from './avatar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';
import { DefaultImageDirective } from '../defaultImage.directive';

@NgModule({
  declarations: [IonAvatarComponent, DefaultImageDirective],
  imports: [CommonModule, IonIconModule],
  exports: [IonAvatarComponent, DefaultImageDirective],
})
export class IonAvatarModule {}
