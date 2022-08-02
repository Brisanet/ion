import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';
import { TabComponent } from './tab/tab.component';
import { IonDividerComponent } from './divider/divider.component';

@NgModule({
  declarations: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    IonDividerComponent,
  ],
  imports: [CommonModule],
  exports: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    IonDividerComponent,
  ],
})
export class IonModule {}
