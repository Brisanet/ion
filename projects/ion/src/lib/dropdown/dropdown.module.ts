import { IonDropdownComponent } from './dropdown.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IonDropdownComponent],
})
export class IonDropdownModule {}
