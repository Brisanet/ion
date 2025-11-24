import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtonModule } from '../button/button.module';
import { IonInputCounterComponent } from './input-counter.component';

@NgModule({
  declarations: [IonInputCounterComponent],
  imports: [CommonModule, FormsModule, IonButtonModule],
  exports: [IonInputCounterComponent],
})
export class IonInputCounterModule {}
