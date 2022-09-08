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
import { MessageComponent } from './message/message.component';
import { TabComponent } from './tab/tab.component';
import { HeadingComponent } from './typography';
import { TagComponent } from './tag/tag.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';
import { CardIonComponent } from './card/card.component';

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
    HeadingComponent,
    AlertComponent,
    MessageComponent,
    NotificationComponent,
    HeadingComponent,
    AvatarComponent,
    DefaultImageDirective,
    BadgeComponent,
    TagComponent,
    DropdownComponent,
    RowComponent,
    ColComponent,
    CardIonComponent,
  ],
  imports: [CommonModule],
  exports: [
    IonComponent,
    ButtonComponent,
    BadgeComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    RadioComponent,
    TabGroupComponent,
    IonDividerComponent,
    HeadingComponent,
    TagComponent,
    DropdownComponent,
    AlertComponent,
    MessageComponent,
    NotificationComponent,
    AvatarComponent,
    RowComponent,
    ColComponent,
    CardIonComponent,
  ],
})
export class IonModule {}
