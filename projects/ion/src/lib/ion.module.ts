import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAlertComponent } from './alert/alert.component';
import { IonAvatarComponent } from './avatar/avatar.component';
import { IonBadgeComponent } from './badge/badge.component';
import { IonBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { IonButtonComponent } from './button/button.component';
import { IonCardComponent } from './card/card.component';
import { IonCheckboxComponent } from './checkbox/checkbox.component';
import { IonChipComponent } from './chip/chip.component';
import { IonColComponent } from './col/col.component';
import { IonDatePickerComponent } from './date-picker/date-picker/date-picker.component';
import { DefaultImageDirective } from './defaultImage.directive';
import { IonDividerComponent } from './divider/divider.component';
import { IonDropdownComponent } from './dropdown/dropdown.component';
import { IonIconComponent } from './icon/icon.component';
import { IonInfoBadgeComponent } from './info-badge/info-badge.component';
import { IonInputCounterComponent } from './input-counter/input-counter.component';
import { IonInputComponent } from './input/input.component';
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
import { IonSmartTableComponent } from './smart-table/smart-table.component';
import { IonSwitchComponent } from './switch/switch.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { IonTabComponent } from './tab/tab.component';
import { TableComponent } from './table/table.component';
import { TagComponent } from './tag/tag.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { HeadingComponent } from './typography/heading/heading.component';

@NgModule({
  declarations: [
    IonComponent,
    IonButtonComponent,
    IonIconComponent,
    IonChipComponent,
    IonTabComponent,
    PopConfirmDirective,
    IonRadioComponent,
    TabGroupComponent,
    IonDividerComponent,
    HeadingComponent,
    IonAlertComponent,
    IonMessageComponent,
    IonNotificationComponent,
    HeadingComponent,
    IonAvatarComponent,
    DefaultImageDirective,
    IonBadgeComponent,
    TagComponent,
    IonDropdownComponent,
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
    IonSmartTableComponent,
    IonSwitchComponent,
    TableComponent,
    IonInputComponent,
    TooltipDirective,
    TooltipComponent,
    IonBreadcrumbComponent,
  ],
  providers: [IonModalService],
  imports: [CommonModule, FormsModule],
  exports: [
    IonComponent,
    IonButtonComponent,
    IonBadgeComponent,
    IonIconComponent,
    IonChipComponent,
    IonTabComponent,
    IonRadioComponent,
    TabGroupComponent,
    IonDividerComponent,
    HeadingComponent,
    TagComponent,
    IonDropdownComponent,
    IonAlertComponent,
    IonMessageComponent,
    IonNotificationComponent,
    IonAvatarComponent,
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
    IonSmartTableComponent,
    TableComponent,
    IonInputCounterComponent,
    IonInputComponent,
    TooltipComponent,
    IonSwitchComponent,
    IonBreadcrumbComponent,
  ],
  entryComponents: [IonPopConfirmComponent, TooltipComponent],
})
export class IonModule {}
