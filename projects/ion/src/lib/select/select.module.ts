import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSelectComponent } from './select.component';
import { IonSelectItemComponent } from './select-item/select-item.component';
import { IonDropdownModule } from '../dropdown/dropdown.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IonSelectComponent, IonSelectItemComponent],
  imports: [CommonModule, FormsModule, IonDropdownModule],
  exports: [IonSelectComponent, IonSelectItemComponent],
})
export class IonSelectModule {}
