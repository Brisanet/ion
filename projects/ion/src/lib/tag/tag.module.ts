import { TagComponent } from './tag.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon/icon.component';

@NgModule({
  declarations: [TagComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [TagComponent, IonIconComponent],
})
export class TagModule {}
