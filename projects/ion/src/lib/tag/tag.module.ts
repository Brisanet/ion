import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTagComponent } from './tag.component';
import { IonIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [IonTagComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonTagComponent],
})
export class IonTagModule {}
