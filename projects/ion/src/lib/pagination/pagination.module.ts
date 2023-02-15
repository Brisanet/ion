import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonModule } from '../button/button.module';
import { IonPaginationComponent } from './pagination.component';

@NgModule({
  declarations: [IonPaginationComponent],
  imports: [CommonModule, IonButtonModule],
  exports: [IonPaginationComponent],
})
export class IonPaginationModule {}
