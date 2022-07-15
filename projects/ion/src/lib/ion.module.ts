import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonComponent } from './ion.component';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent, ThemeComponent],
  imports: [],
  exports: [IonComponent, ButtonComponent],
})
export class IonModule {}
