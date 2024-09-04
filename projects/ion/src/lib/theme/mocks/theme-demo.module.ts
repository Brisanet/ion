import { NgModule } from '@angular/core';

import { IonModule } from '../../ion.module';
import { ThemeDemoComponent } from './theme-demo.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ThemeDemoComponent],
  imports: [IonModule, CommonModule],
  exports: [ThemeDemoComponent],
})
export class ThemeDemoModule {}
