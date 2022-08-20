import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { DefaultImageDirective } from './defaultImage.directive';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';
import { RadioComponent } from './radio/radio.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { AlertComponent } from './alert/alert.component';
import { IonDividerComponent } from './divider/divider.component';
import { NotificationComponent } from './notification/notification.component';
import { TabComponent } from './tab/tab.component';
import { HeadingComponent } from './typography';
import { DatePickerComponent } from './date-picker/date-picker.component';

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
    AlertComponent,
    NotificationComponent,
    HeadingComponent,
    AvatarComponent,
    DefaultImageDirective,
    BadgeComponent,
    DatePickerComponent,
  ],
  imports: [CommonModule],
  exports: [
    IonComponent,
    ButtonComponent,
    BadgeComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    TabGroupComponent,
    IonDividerComponent,
    AlertComponent,
    HeadingComponent,
    AvatarComponent,
    DatePickerComponent,
  ],
})
export class IonModule {}
