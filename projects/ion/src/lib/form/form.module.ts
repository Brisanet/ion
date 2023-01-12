import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonIconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/input.component';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [FormComponent, InputComponent, IonIconComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormComponent],
  entryComponents: [InputComponent],
})
export class IonFormModule {}
