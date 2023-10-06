import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAccordionComponent } from './accordion.component';
import { IonIconModule } from '../icon/icon.module';
import { IonAccordionGroupComponent } from '../accordion-group/accordion-group.component';

@NgModule({
  declarations: [IonAccordionComponent, IonAccordionGroupComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonAccordionComponent, IonAccordionGroupComponent],
})
export class IonAccordionModule {}
