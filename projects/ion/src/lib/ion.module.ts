import { CheckboxComponent } from './checkbox/checkbox.component';
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
import { HeadingComponent } from './typography/heading/heading.component';
import { TagComponent } from './tag/tag.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';
import { CardIonComponent } from './card/card.component';

import { InputContadorComponent } from './input-contador/input-contador.component';

import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { InfoBadgeComponent } from './info-badge/info-badge.component';

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
    CheckboxComponent,
    CardIonComponent,

    InputContadorComponent,

    InfoBadgeComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, FormsModule],
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
    CheckboxComponent,
    CardIonComponent,
    InfoBadgeComponent,
    PaginationComponent,
  ],
})
export class IonModule {}
