import { IonDropdownComponent } from './dropdown.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonDropdownComponent],
})
export class IonDropdownModule {}
