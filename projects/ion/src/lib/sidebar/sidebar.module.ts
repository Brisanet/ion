import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonIconComponent } from '../icon/icon.component';
import { SidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarGroupComponent,
    IonIconComponent,
  ],
})
export class SidebarModule {}
