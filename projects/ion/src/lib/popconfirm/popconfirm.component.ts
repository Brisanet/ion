import { Component, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ion-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  exportAs: 'PopConfirmComponent',
})
export class PopConfirmComponent {
  @Input() ionPopConfirmTitle: string;
  readonly ionOnConfirm = new Subject<void>();
  readonly ionOnClose = new Subject<void>();

  handleConfirm(): void {
    this.ionOnConfirm.next();
  }

  close(): void {
    this.ionOnClose.next();
  }
}
