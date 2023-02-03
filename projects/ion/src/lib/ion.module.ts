import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonColComponent } from './col/col.component';
import { IonInputCounterComponent } from './input-counter/input-counter.component';
import { IonComponent } from './ion.component';
import { IonMessageComponent } from './message/message.component';
import { IonModalComponent } from './modal/component/modal.component';
import { IonModalService } from './modal/modal.service';
import { IonNotificationComponent } from './notification/notification.component';
import { IonPaginationComponent } from './pagination/pagination.component';
import { IonPopConfirmComponent } from './popconfirm/popconfirm.component';
import { PopConfirmDirective } from './popconfirm/popconfirm.directive';
import { IonRadioComponent } from './radio/radio.component';
import { IonRowComponent } from './row/row.component';
import { IonSimpleMenuComponent } from './simple-menu/simple-menu.component';
import { IonSmartIonTableComponent } from './smart-table/smart-table.component';
import { IonSwitchComponent } from './switch/switch.component';
import { IonTabGroupComponent } from './tab-group/tab-group.component';
import { IonTabComponent } from './tab/tab.component';
import { IonTableComponent } from './table/table.component';
import { IonTooltipModule } from './tooltip/tooltip.module';
import { IonTypographyModule } from './typography/typography.module';
import { IonIconModule } from './icon/icon.module';
import { IonButtonModule } from './button/button.module';
import { IonBadgeModule } from './badge/badge.module';
import { IonDropdownModule } from './dropdown/dropdown.module';
import { IonInputModule } from './input/input.module';
import { IonTagModule } from './tag/tag.module';
import { IonAvatarModule } from './avatar/avatar.module';
import { IonAlertModule } from './alert/alert.module';
import { IonBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { IonInfoBadgeModule } from './info-badge/info-badge.module';
import { IonChipModule } from './chip/chip.module';
import { IonCardModule } from './card/card.module';
import { IonCheckboxModule } from './checkbox/checkbox.module';
import { IonDatePickerModule } from './date-picker/date-picker/date-picker.module';
import { IonDividerModule } from './divider/divider.module';

@NgModule({
  declarations: [
    IonComponent,
    IonTabComponent,
    PopConfirmDirective,
    IonRadioComponent,
    IonTabGroupComponent,
    IonMessageComponent,
    IonNotificationComponent,
    IonRowComponent,
    IonColComponent,
    IonInputCounterComponent,
    IonSimpleMenuComponent,
    IonModalComponent,
    IonPaginationComponent,
    IonPopConfirmComponent,
    IonSmartIonTableComponent,
    IonSwitchComponent,
    IonTableComponent,
  ],
  providers: [IonModalService],
  imports: [
    CommonModule,
    FormsModule,
    IonTypographyModule,
    IonIconModule,
    IonButtonModule,
    IonBadgeModule,
    IonDropdownModule,
    IonInputModule,
    IonTagModule,
    IonAvatarModule,
    IonAlertModule,
    IonBreadcrumbModule,
    IonInfoBadgeModule,
    IonChipModule,
    IonCardModule,
    IonCheckboxModule,
    IonDatePickerModule,
    IonDividerModule,
  ],
  exports: [
    IonComponent,
    IonTabComponent,
    IonRadioComponent,
    IonTabGroupComponent,
    IonMessageComponent,
    IonNotificationComponent,
    IonRowComponent,
    IonColComponent,
    IonSimpleMenuComponent,
    IonSimpleMenuComponent,
    IonModalComponent,
    IonPaginationComponent,
    IonPopConfirmComponent,
    IonSmartIonTableComponent,
    IonTableComponent,
    IonInputCounterComponent,
    IonSwitchComponent,
    IonTooltipModule,
    IonTypographyModule,
    IonIconModule,
    IonButtonModule,
    IonBadgeModule,
    IonDropdownModule,
    IonInputModule,
    IonTagModule,
    IonAvatarModule,
    IonAlertModule,
    IonBreadcrumbModule,
    IonInfoBadgeModule,
    IonChipModule,
    IonCardModule,
    IonCheckboxModule,
    IonDatePickerModule,
    IonDividerModule,
  ],
  entryComponents: [IonPopConfirmComponent],
})
export class IonModule {}
