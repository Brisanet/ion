import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { PopConfirmProps } from '../core/types/popconfirm';

@Component({
  selector: 'ion-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  exportAs: 'IonPopConfirmComponent',
})
export class IonPopConfirmComponent {
  @Input() ionPopConfirmTitle: string;
  @Input() ionPopConfirmDesc: string;
  @Input() ionPopConfirmType: PopConfirmProps['ionPopConfirmType'] = 'warning';
  @Input() ionConfirmText: PopConfirmProps['ionConfirmText'] = 'Confirmar';
  @Input() ionCancelText: PopConfirmProps['ionCancelText'] = 'Cancelar';

  readonly ionOnConfirm = new Subject<void>();
  readonly ionOnClose = new Subject<void>();

  onClickOutside(): void {
    this.close();
  }

  handleConfirm(): void {
    this.ionOnConfirm.next();
  }

  close(): void {
    this.ionOnClose.next();
  }
}
