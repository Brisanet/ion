import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAccordionComponent } from './accordion.component';
import { IonIconModule } from '../icon/icon.module';
import { IonAccordionItemComponent } from './accordion-item/accordion-item.component';

@NgModule({
  declarations: [IonAccordionComponent, IonAccordionItemComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonAccordionComponent, IonAccordionItemComponent],
})
export class IonAccordionModule {}
