import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { DefaultImageDirective } from './defaultImage.directive';
import { IonDividerComponent } from './divider/divider.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';
import { NotificationComponent } from './notification/notification.component';
import { RadioComponent } from './radio/radio.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
import { HeadingComponent } from './typography';

@NgModule({
  declarations: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    RadioComponent,
    TabGroupComponent,
    IonDividerComponent,
    NotificationComponent,
    HeadingComponent,
    AvatarComponent,
    DefaultImageDirective,
    BadgeComponent,
  ],
  imports: [CommonModule],
  exports: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    TabGroupComponent,
    IonDividerComponent,
    HeadingComponent,
    AvatarComponent,
  ],
})
export class IonModule {}
