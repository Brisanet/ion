import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IonIconComponent } from './icon/icon.component';
import { IonComponent } from './ion.component';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { IonDividerComponent } from './divider/divider.component';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';

@NgModule({
  declarations: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    TabGroupComponent,
    IonDividerComponent,
    RowComponent,
    ColComponent,
  ],
  imports: [CommonModule],
  exports: [
    IonComponent,
    ButtonComponent,
    IonIconComponent,
    ChipComponent,
    TabComponent,
    TabGroupComponent,
    IonDividerComponent,
    RowComponent,
    ColComponent,
  ],
})
export class IonModule {}
