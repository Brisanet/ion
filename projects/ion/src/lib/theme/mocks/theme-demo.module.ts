import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonModule } from '../../ion.module';
import { InputMockComponent } from '../../modal/mock/input.mock.component';
import { ThemeDemoComponent } from './theme-demo.component';

@NgModule({
  declarations: [ThemeDemoComponent, InputMockComponent],
  entryComponents: [InputMockComponent],
  imports: [IonModule, CommonModule, FormsModule],
  exports: [ThemeDemoComponent],
})
export class ThemeDemoModule {}
