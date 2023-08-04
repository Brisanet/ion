import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from './button.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IonButtonComponent],
})
export class IonButtonModule {}
