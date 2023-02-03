import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSharedModule } from '../shared.module';
import { IonTagComponent } from './tag.component';

@NgModule({
  declarations: [IonTagComponent],
  imports: [CommonModule, IonSharedModule],
  exports: [IonTagComponent],
})
export class IonTagModule {}
