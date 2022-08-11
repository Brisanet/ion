import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { IonDividerComponent } from './divider/divider.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';
import { RadioComponent } from './radio/radio.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { AlertComponent } from './alert/alert.component';
import { TabComponent } from './tab/tab.component';
import { HeadingComponent } from './typography';
import { BadgeComponent } from './badge/badge.component';

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
    HeadingComponent,
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
    AlertComponent,
    HeadingComponent,
  ],
})
export class IonModule {}
