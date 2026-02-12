import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from '../button/button.component';
import { IonDividerComponent } from '../divider/divider.component';
import { IconType, StatusType } from '../core/types';
import { IonIconComponent } from '../icon/icon.component';

@Component({
  selector: 'ion-popconfirm',
  imports: [
    CommonModule,
    IonIconComponent,
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
  ionPopConfirmPosition = signal<string>('');

  ionOnConfirm = output<void>();
  ionOnClose = output<void>();

  iconConfig: Record<StatusType, { type: IconType; color: string }> = {
    success: {
      type: 'check-outlined',
      color: '#2d9f70',
    },
    info: {
      type: 'check-outlined',
      color: '#0858ce',
    },
    warning: {
      type: 'information',
      color: '#f9a915',
    },
    negative: {
      type: 'information',
      color: '#d6293a',
    },
  }

  iconColorAndType = computed(() => {
    return this.iconConfig[this.ionPopConfirmType()];
  });

  handleConfirm(): void {
    this.ionOnConfirm.emit();
  }

  close(): void {
    this.ionOnClose.emit();
  }
}
