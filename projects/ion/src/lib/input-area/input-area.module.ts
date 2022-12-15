import { InputAreaComponent } from './input-area.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [InputAreaComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputAreaComponent],
})
export class InputAreaModule {}
