import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonComponent } from './ion.component';
import { IonModalComponent } from './modal/component/modal.component';
import { IonModalService } from './modal/modal.service';
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
import { IonInputAreaModule } from './input-area/input-area.module';
import { IonInputCounterModule } from './input-counter/input-counter.module';
import { IonMessageModule } from './message/message.module';
import { IonNotificationModule } from './notification/notification.module';
import { IonPaginationModule } from './pagination/pagination.module';
import { IonRadioModule } from './radio/radio.module';
import { IonTabModule } from './tab/tab.module';
import { IonTabGroupModule } from './tab-group/tab-group.module';
import { IonSimpleMenuModule } from './simple-menu/simple-menu.module';
import { IonSwitchModule } from './switch/switch.module';
import { IonPopConfirmModule } from './popconfirm/popconfirm.module';
import { IonTableModule } from './table/table.module';
import { IonSmartTableModule } from './smart-table/smart-table.module';
import { IonColModule } from './col/col.module';
import { IonRowModule } from './row/row.module';

@NgModule({
  declarations: [IonComponent, IonModalComponent],
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
    IonInputAreaModule,
    IonInputCounterModule,
    IonMessageModule,
    IonNotificationModule,
    IonPaginationModule,
    IonRadioModule,
    IonTabModule,
    IonTabGroupModule,
    IonSimpleMenuModule,
    IonSwitchModule,
    IonPopConfirmModule,
    IonTableModule,
    IonSmartTableModule,
    IonColModule,
    IonRowModule,
  ],
  exports: [
    IonComponent,
    IonModalComponent,
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
    IonInputAreaModule,
    IonInputCounterModule,
    IonMessageModule,
    IonNotificationModule,
    IonPaginationModule,
    IonRadioModule,
    IonTabModule,
    IonTabGroupModule,
    IonSimpleMenuModule,
    IonSwitchModule,
    IonPopConfirmModule,
    IonTableModule,
    IonSmartTableModule,
    IonColModule,
    IonRowModule,
  ],
})
export class IonModule {}
