import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonPopConfirmDirective } from './popconfirm.directive';
import { IonPopConfirmComponent } from './popconfirm.component';
import { IonAlertModule } from '../alert/alert.module';
import { IonDividerModule } from '../divider/divider.module';
import { IonButtonModule } from '../button/button.module';

@NgModule({
  declarations: [IonPopConfirmDirective, IonPopConfirmComponent],
  imports: [CommonModule, IonAlertModule, IonDividerModule, IonButtonModule],
  exports: [IonPopConfirmDirective],
  entryComponents: [IonPopConfirmComponent],
})
export class IonPopConfirmModule {}
