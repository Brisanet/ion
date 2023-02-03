import { IonAvatarComponent } from './avatar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from '../defaultImage.directive';
import { IonSharedModule } from '../shared.module';

@NgModule({
  declarations: [IonAvatarComponent, DefaultImageDirective],
  imports: [CommonModule, IonSharedModule],
  exports: [IonAvatarComponent],
})
export class IonAvatarModule {}
