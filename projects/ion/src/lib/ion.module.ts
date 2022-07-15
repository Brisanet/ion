import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonComponent } from './ion.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent],
  imports: [],
  exports: [IonComponent, ButtonComponent],
})
export class IonModule {}
