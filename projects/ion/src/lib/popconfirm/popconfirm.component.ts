import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAlertComponent } from '../alert/alert.component';
import { IonButtonComponent } from '../button/button.component';
import { IonDividerComponent } from '../divider/divider.component';
import { StatusType } from '../core/types';

@Component({
  selector: 'ion-popconfirm',
  imports: [
    CommonModule,
    IonAlertComponent,
    IonButtonComponent,
    IonDividerComponent,
  ],
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  exportAs: 'IonPopConfirmComponent',
})
export class IonPopConfirmComponent {
  ionPopConfirmTitle = input.required<string>();
  ionPopConfirmDesc = input<string>('');
  ionPopConfirmType = input<StatusType>('warning');
  ionConfirmText = input<string>('Confirmar');
  ionCancelText = input<string>('Cancelar');

  ionOnConfirm = output<void>();
  ionOnClose = output<void>();

  handleConfirm(): void {
    this.ionOnConfirm.emit();
  }

  close(): void {
    this.ionOnClose.emit();
  }
}
