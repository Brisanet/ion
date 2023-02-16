import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonIconModule } from '../icon/icon.module';
import { IonInputModule } from '../input/input.module';
import { FormComponent } from './form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInputModule,
    IonIconModule,
  ],
  exports: [FormComponent],
})
export class IonFormModule {}
