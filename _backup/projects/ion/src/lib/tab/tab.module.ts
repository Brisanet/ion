import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabComponent } from './tab.component';
import { IonIconModule } from '../icon/icon.module';
import { IonBadgeModule } from '../badge/badge.module';

@NgModule({
  declarations: [IonTabComponent],
  imports: [CommonModule, IonIconModule, IonBadgeModule],
  exports: [IonTabComponent],
})
export class IonTabModule {}
