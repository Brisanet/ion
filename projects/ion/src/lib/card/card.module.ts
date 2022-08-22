import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { CardIonComponent } from './card.component';

@NgModule({
  declarations: [CardIonComponent, ButtonComponent, IonIconComponent],
  imports: [CommonModule],
  exports: [CardIonComponent],
})
export class CardIonModule {}
