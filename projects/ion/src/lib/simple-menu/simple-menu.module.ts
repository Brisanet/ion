import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSimpleMenuComponent } from './simple-menu.component';
import { IonIconModule } from '../icon/icon.module';
import { IonButtonModule } from '../button/button.module';
import { IonAvatarModule } from '../avatar/avatar.module';
import { IonTabGroupModule } from '../tab-group/tab-group.module';

@NgModule({
  declarations: [IonSimpleMenuComponent],
  imports: [
    CommonModule,
    IonIconModule,
    IonButtonModule,
    IonAvatarModule,
    IonTabGroupModule,
  ],
  exports: [IonSimpleMenuComponent],
})
export class IonSimpleMenuModule {}
