import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRadioGroupComponent } from './radio-group.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [IonRadioGroupComponent],
  exports: [IonRadioGroupComponent],
})
export class IonRadioGroupModule {}
