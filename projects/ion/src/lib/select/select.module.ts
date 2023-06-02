import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSelectComponent } from './select.component';
import { IonSelectItemComponent } from './select-item/select-item.component';
import { IonIconModule } from '../icon/icon.module';
import { IonDropdownModule } from '../dropdown/dropdown.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IonSelectComponent, IonSelectItemComponent],
  imports: [CommonModule, FormsModule, IonIconModule, IonDropdownModule],
  exports: [IonSelectComponent, IonSelectItemComponent],
})
export class IonSelectModule {}
