import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCardComponent } from './card/card.component';
import { IonCheckboxComponent } from './checkbox/checkbox.component';
import { IonChipComponent } from './chip/chip.component';
import { IonColComponent } from './col/col.component';
import { IonDatePickerComponent } from './date-picker/date-picker/date-picker.component';
import { IonDividerComponent } from './divider/divider.component';
import { IonInfoBadgeComponent } from './info-badge/info-badge.component';
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

@NgModule({
  declarations: [
    IonComponent,
    IonChipComponent,
    IonTabComponent,
    PopConfirmDirective,
    IonRadioComponent,
    IonTabGroupComponent,
    IonDividerComponent,
    IonMessageComponent,
    IonNotificationComponent,
    IonRowComponent,
    IonColComponent,
    IonCheckboxComponent,
    IonCardComponent,
    IonInputCounterComponent,
    IonDatePickerComponent,
    IonInfoBadgeComponent,
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
  ],
  exports: [
    IonComponent,
    IonChipComponent,
    IonTabComponent,
    IonRadioComponent,
    IonTabGroupComponent,
    IonDividerComponent,
    IonMessageComponent,
    IonNotificationComponent,
    IonRowComponent,
    IonColComponent,
    IonCheckboxComponent,
    IonCardComponent,
    IonDatePickerComponent,
    IonSimpleMenuComponent,
    IonInfoBadgeComponent,
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
  ],
  entryComponents: [IonPopConfirmComponent],
})
export class IonModule {}
