import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonInputSelectComponent } from './input-select.component';
import { IonSharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IonInputSelectComponent],
  imports: [CommonModule, FormsModule, IonSharedModule],
  exports: [IonInputSelectComponent],
})
export class IonInputSelectModule {}
