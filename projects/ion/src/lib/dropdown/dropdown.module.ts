import { DropdownComponent } from './dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@NgModule({
  declarations: [DropdownComponent, IonIconComponent, InputComponent],
  imports: [CommonModule, FormsModule],
  exports: [DropdownComponent, IonIconComponent, InputComponent],
})
export class DropdownModule {}
