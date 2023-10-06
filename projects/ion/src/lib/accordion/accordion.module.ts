import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAccordionComponent } from './accordion.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonAccordionComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonAccordionComponent],
})
export class IonAccordionModule {}
