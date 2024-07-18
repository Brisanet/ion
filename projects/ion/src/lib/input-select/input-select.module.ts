import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonInputSelectComponent } from './input-select.component';
import { IonSharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonInputSelectComponent],
  imports: [CommonModule, FormsModule, IonSharedModule, IonIconModule],
  exports: [IonInputSelectComponent],
})
export class IonInputSelectModule {}
