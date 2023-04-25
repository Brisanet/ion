import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSkeletonComponent } from './skeleton.component';

@NgModule({
  declarations: [IonSkeletonComponent],
  imports: [CommonModule],
  exports: [IonSkeletonComponent],
})
export class IonSkeletonModule {}
