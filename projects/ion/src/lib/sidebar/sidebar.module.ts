import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonTooltipModule } from './../tooltip/tooltip.module';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { IonSidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, IonIconModule, IonButtonModule, IonTooltipModule],
  declarations: [
    IonSidebarComponent,
    IonSidebarItemComponent,
    IonSidebarGroupComponent,
  ],
  exports: [IonSidebarComponent, IonSidebarItemComponent],
})
export class IonSidebarModule {}
