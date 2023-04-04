import { IonInputModule } from './../input/input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSelectComponent } from './select.component';

@NgModule({
  declarations: [IonSelectComponent],
  imports: [CommonModule, IonInputModule],
  exports: [IonSelectComponent],
})
export class IonSelectModule {}
