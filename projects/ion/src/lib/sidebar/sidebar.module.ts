import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonSharedModule } from '../shared.module';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { IonSidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, IonIconModule, IonButtonModule, IonSharedModule],
  declarations: [
    IonSidebarComponent,
    IonSidebarItemComponent,
    IonSidebarGroupComponent,
  ],
  exports: [IonSidebarComponent],
})
export class IonSidebarModule {}
