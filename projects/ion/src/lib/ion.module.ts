import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAlertComponent } from './alert/alert.component';
import { IonAvatarComponent } from './avatar/avatar.component';
import { IonBadgeComponent } from './badge/badge.component';
import { IonBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonComponent } from './button/button.component';
import { CardIonComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChipComponent } from './chip/chip.component';
import { ColComponent } from './col/col.component';
import { DatePickerComponent } from './date-picker/date-picker/date-picker.component';
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
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
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
    ColComponent,
    CheckboxComponent,
    CardIonComponent,
    InputCounterComponent,
    DatePickerComponent,
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
    ButtonComponent,
    IonBadgeComponent,
    IonIconComponent,
    ChipComponent,
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
    ColComponent,
    CheckboxComponent,
    CardIonComponent,
    DatePickerComponent,
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
