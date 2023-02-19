import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabGroupComponent } from './tab-group.component';
import { IonTabModule } from '../tab/tab.module';

@NgModule({
  declarations: [IonTabGroupComponent],
  imports: [CommonModule, IonTabModule],
  exports: [IonTabGroupComponent],
})
export class IonTabGroupModule {}
