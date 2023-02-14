import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { SidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, IonIconModule, IonButtonModule],
  declarations: [SidebarComponent, SidebarItemComponent, SidebarGroupComponent],
})
export class SidebarModule {}
