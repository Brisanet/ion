import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonSharedModule } from '../shared.module';
import { IonLinkComponent } from './link.component';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonLinkComponent],
})
export class IonLinkModule {}
