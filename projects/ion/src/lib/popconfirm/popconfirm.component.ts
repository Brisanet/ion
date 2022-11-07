import { Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ion-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  exportAs: 'PopConfirmComponent',
})
export class PopConfirmComponent {
  readonly ionOnConfirm = new Subject<void>();

  constructor(private host: ElementRef<HTMLElement>) {}

  handleConfirm(): void {
    this.ionOnConfirm.next();
  }

  close(): void {
    this.host.nativeElement.remove();
  }
}
