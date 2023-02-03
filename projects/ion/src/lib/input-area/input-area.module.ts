import { IonInputAreaComponent } from './input-area.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [IonInputAreaComponent],
  imports: [CommonModule, FormsModule],
  exports: [IonInputAreaComponent],
})
export class IonInputAreaModule {}
