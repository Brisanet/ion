import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCollapseComponent } from './collapse.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonCollapseComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonCollapseComponent],
})
export class IonCollapseModule {}
