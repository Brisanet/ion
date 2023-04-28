import { IonDropdownModule } from './../dropdown/dropdown.module';
import { IonInputModule } from './../input/input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSelectComponent } from './select.component';

@NgModule({
  declarations: [IonSelectComponent],
  imports: [CommonModule, IonInputModule, IonDropdownModule],
  exports: [IonSelectComponent],
})
export class IonSelectModule {}
