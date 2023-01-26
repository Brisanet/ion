import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonIconComponent } from '../icon/icon.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarComponent, SidebarItemComponent, IonIconComponent],
})
export class SidebarModule {}
