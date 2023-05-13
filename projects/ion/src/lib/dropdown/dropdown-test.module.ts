import { NgModule } from '@angular/core';
import { IonDropdownComponent } from './dropdown.component';

import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonInputModule } from '../input/input.module';
import { IonDropdownModule } from './dropdown.module';

@NgModule({
  declarations: [],
  imports: [IonIconModule, IonButtonModule, IonInputModule, IonDropdownModule],
  exports: [IonDropdownComponent],
})
export class IonDropdownTestModule {}
