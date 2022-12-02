import { DropdownComponent } from './dropdown.component';
import { IonIconComponent } from './../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DropdownComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [DropdownComponent, IonIconComponent],
})
export class DropdownModule {}
