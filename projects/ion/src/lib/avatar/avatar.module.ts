import { AvatarComponent } from './../../../../../storybook-static/lib/avatar/avatar.component';
import { IonIconComponent } from './../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AvatarComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [AvatarComponent, IonIconComponent],
})
export class AvatarModule {}
