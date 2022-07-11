import { NgModule } from '@angular/core';
import { IonComponent } from './ion.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [IonComponent, ButtonComponent],
  imports: [],
  exports: [IonComponent, ButtonComponent],
})
export class IonModule {}
