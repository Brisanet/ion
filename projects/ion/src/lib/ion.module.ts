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
import { PaginationComponent } from './pagination/pagination.component';
import { PopConfirmComponent } from './popconfirm/popconfirm.component';
import { PopConfirmDirective } from './popconfirm/popconfirm.directive';
import { RadioComponent } from './radio/radio.component';
import { RowComponent } from './row/row.component';
import { SimpleMenuComponent } from './simple-menu/simple-menu.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { SwitchComponent } from './switch/switch.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
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
    TabComponent,
    PopConfirmDirective,
    RadioComponent,
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
    RowComponent,
    IonColComponent,
    IonCheckboxComponent,
    IonCardComponent,
    IonInputCounterComponent,
    IonDatePickerComponent,
    IonInfoBadgeComponent,
    SimpleMenuComponent,
    IonModalComponent,
    PaginationComponent,
    PopConfirmComponent,
    SmartTableComponent,
    SwitchComponent,
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
    TabComponent,
    RadioComponent,
    TabGroupComponent,
    IonDividerComponent,
    HeadingComponent,
    TagComponent,
    IonDropdownComponent,
    IonAlertComponent,
    IonMessageComponent,
    IonNotificationComponent,
    IonAvatarComponent,
    RowComponent,
    IonColComponent,
    IonCheckboxComponent,
    IonCardComponent,
    IonDatePickerComponent,
    SimpleMenuComponent,
    IonInfoBadgeComponent,
    SimpleMenuComponent,
    IonModalComponent,
    PaginationComponent,
    PopConfirmComponent,
    SmartTableComponent,
    TableComponent,
    IonInputCounterComponent,
    IonInputComponent,
    TooltipComponent,
    SwitchComponent,
    IonBreadcrumbComponent,
  ],
  entryComponents: [PopConfirmComponent, TooltipComponent],
})
export class IonModule {}
