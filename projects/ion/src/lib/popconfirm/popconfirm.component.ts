import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { StatusType } from '../core/types';

export interface PopConfirmProps {
  ionPopConfirmTitle: string;
  ionPopConfirmType?: StatusType;
  ionPopConfirmDesc?: string;
  ionConfirmText?: string;
  ionCancelText?: string;
}

@Component({
  selector: 'ion-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  exportAs: 'PopConfirmComponent',
})
export class PopConfirmComponent {
  @Input() ionPopConfirmTitle: string;
  @Input() ionPopConfirmDesc: string;
  @Input() ionPopConfirmType: PopConfirmProps['ionPopConfirmType'] = 'warning';
  @Input() ionConfirmText: PopConfirmProps['ionConfirmText'] = 'Confirmar';
  @Input() ionCancelText: PopConfirmProps['ionCancelText'] = 'Cancelar';

  readonly ionOnConfirm = new Subject<void>();
  readonly ionOnClose = new Subject<void>();

  handleConfirm(): void {
    this.ionOnConfirm.next();
  }

  close(): void {
    this.ionOnClose.next();
  }
}
