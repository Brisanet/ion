import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { IonSidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, IonIconModule, IonButtonModule],
  declarations: [
    IonSidebarComponent,
    IonSidebarItemComponent,
    IonSidebarGroupComponent,
  ],
})
export class IonSidebarModule {}
