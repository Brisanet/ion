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
import { DropdownComponent } from './dropdown/dropdown.component';
import { IonIconComponent } from './icon/icon.component';
import { InfoBadgeComponent } from './info-badge/info-badge.component';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { InputComponent } from './input/input.component';
import { IonComponent } from './ion.component';
import { MessageComponent } from './message/message.component';
import { IonModalComponent } from './modal/component/modal.component';
import { IonModalService } from './modal/modal.service';
import { NotificationComponent } from './notification/notification.component';
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
    MessageComponent,
    NotificationComponent,
    HeadingComponent,
    IonAvatarComponent,
    DefaultImageDirective,
    IonBadgeComponent,
    TagComponent,
    DropdownComponent,
    RowComponent,
    IonColComponent,
    IonCheckboxComponent,
    IonCardComponent,
    InputCounterComponent,
    IonDatePickerComponent,
    InfoBadgeComponent,
    SimpleMenuComponent,
    IonModalComponent,
    PaginationComponent,
    PopConfirmComponent,
    SmartTableComponent,
    SwitchComponent,
    TableComponent,
    InputComponent,
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
    DropdownComponent,
    IonAlertComponent,
    MessageComponent,
    NotificationComponent,
    IonAvatarComponent,
    RowComponent,
    IonColComponent,
    IonCheckboxComponent,
    IonCardComponent,
    IonDatePickerComponent,
    SimpleMenuComponent,
    InfoBadgeComponent,
    SimpleMenuComponent,
    IonModalComponent,
    PaginationComponent,
    PopConfirmComponent,
    SmartTableComponent,
    TableComponent,
    InputCounterComponent,
    InputComponent,
    TooltipComponent,
    SwitchComponent,
    IonBreadcrumbComponent,
  ],
  entryComponents: [PopConfirmComponent, TooltipComponent],
})
export class IonModule {}
