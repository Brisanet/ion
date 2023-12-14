import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAlertModule } from './alert/alert.module';
import { IonAvatarModule } from './avatar/avatar.module';
import { IonBadgeModule } from './badge/badge.module';
import { IonBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { IonButtonModule } from './button/button.module';
import { IonCardModule } from './card/card.module';
import { IonCheckboxModule } from './checkbox/checkbox.module';
import { IonChipGroupModule } from './chip-group/chip-group.module';
import { IonChipModule } from './chip/chip.module';
import { IonColModule } from './col/col.module';
import { IonDividerModule } from './divider/divider.module';
import { IonDropdownModule } from './dropdown/dropdown.module';
import { IonIconModule } from './icon/icon.module';
import { IonIndicatorModule } from './indicator/indicator.module';
import { IonInfoBadgeModule } from './info-badge/info-badge.module';
import { IonInputAreaModule } from './input-area/input-area.module';
import { IonInputCounterModule } from './input-counter/input-counter.module';
import { IonInputSelectModule } from './input-select/input-select.module';
import { IonInputModule } from './input/input.module';
import { IonComponent } from './ion.component';
import { IonMessageModule } from './message/message.module';
import { IonModalModule } from './modal/modal.module';
import { IonNoDataModule } from './no-data/no-data.module';
import { IonNotificationModule } from './notification/notification.module';
import { IonPaginationModule } from './pagination/pagination.module';
import { IonDatePickerModule } from './picker/date-picker/date-picker.module';
import { IonPopConfirmModule } from './popconfirm/popconfirm.module';
import { IonPopoverModule } from './popover/popover.module';
import { IonRadioGroupModule } from './radio-group/radio-group.module';
import { IonRadioModule } from './radio/radio.module';
import { IonRowModule } from './row/row.module';
import { IonSelectModule } from './select/select.module';
import { IonSidebarModule } from './sidebar/sidebar.module';
import { IonSimpleMenuModule } from './simple-menu/simple-menu.module';
import { IonSkeletonModule } from './skeleton/skeleton.module';
import { IonSmartTableModule } from './smart-table/smart-table.module';
import { IonSpinnerModule } from './spinner/spinner.module';
import { IonStepsModule } from './step/step.module';
import { IonSwitchModule } from './switch/switch.module';
import { IonTabGroupModule } from './tab-group/tab-group.module';
import { IonTabModule } from './tab/tab.module';
import { IonTableModule } from './table/table.module';
import { IonTagModule } from './tag/tag.module';
import { IonTooltipModule } from './tooltip/tooltip.module';
import { IonTripleToggleModule } from './triple-toggle/triple-toggle.module';
import { IonTypographyModule } from './typography/typography.module';
import { PipesModule } from './utils/pipes/pipes.module';
import { IonAccordionModule } from './accordion/accordion.module';
import { IonLinkModule } from './link/link.module';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@NgModule({
  declarations: [IonComponent],
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
    IonModalModule,
    IonIndicatorModule,
    IonPopoverModule,
    IonSidebarModule,
    IonRadioGroupModule,
    IonSkeletonModule,
    IonDatePickerModule,
    IonChipGroupModule,
    IonSpinnerModule,
    PipesModule,
    IonSelectModule,
    IonStepsModule,
    IonNoDataModule,
    IonInputSelectModule,
    IonAccordionModule,
    IonLinkModule,
    IonTripleToggleModule,
  ],
  exports: [
    IonComponent,
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
    IonModalModule,
    IonIndicatorModule,
    IonPopoverModule,
    IonSidebarModule,
    IonDatePickerModule,
    IonRadioGroupModule,
    IonChipGroupModule,
    IonSpinnerModule,
    IonSkeletonModule,
    IonSelectModule,
    IonStepsModule,
    IonNoDataModule,
    IonInputSelectModule,
    IonAccordionModule,
    IonLinkModule,
    IonTripleToggleModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class IonModule {}
