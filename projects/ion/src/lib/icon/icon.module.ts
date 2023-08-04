import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from './icon.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IonIconComponent],
})
export class IonIconModule {}
