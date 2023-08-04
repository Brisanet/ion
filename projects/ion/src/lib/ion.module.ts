import { NgModule } from '@angular/core';
import { IonIconComponent } from './icon/icon.component';
import { IonBadgeComponent } from './badge/badge.component';
import { IonDropdownComponent } from './dropdown/dropdown.component';
import { IonButtonComponent } from './button/button.component';
import { IonInputComponent } from './input/input.component';
import { CommonModule } from '@angular/common';
import { IonNoDataComponent } from './no-data/no-data.component';
import { FormsModule } from '@angular/forms';
import { ChipComponent } from './chip/chip.component';
import { IonInfoBadgeComponent } from './info-badge/info-badge.component';
import { SharedModule } from './shared.module';
import { IonButtonModule } from './button/button.module';
import { IonDropdownModule } from './dropdown/dropdown.module';
import { IonBadgeModule } from './badge/badge.module';
import { IonChipModule } from './chip/chip.module';
import { IonIconModule } from './icon/icon.module';
import { IonInfoBadgeModule } from './info-badge/info-badge.module';
import { IonNoDataModule } from './no-data/no-data.module';
import { IonInputModule } from './input/input.module';
import { IonAlertModule } from './alert/alert.module';
import { IonAvatarModule } from './avatar/avatar.module';
import { IonBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { IonCheckboxModule } from './checkbox/checkbox.module';
import { IonDividerModule } from './divider/divider.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonAlertModule,
    IonDropdownModule,
    IonButtonModule,
    IonBadgeModule,
    IonChipModule,
    IonIconModule,
    IonInfoBadgeModule,
    IonNoDataModule,
    IonInputModule,
    IonAvatarModule,
    IonBreadcrumbModule,
    IonCheckboxModule,
    IonDividerModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonAlertModule,
    IonDropdownModule,
    IonButtonModule,
    IonBadgeModule,
    IonChipModule,
    IonIconModule,
    IonInfoBadgeModule,
    IonNoDataModule,
    IonInputModule,
    IonAvatarModule,
    IonBreadcrumbModule,
    IonCheckboxModule,
    IonDividerModule,
  ],
})
export class IonModule {}
