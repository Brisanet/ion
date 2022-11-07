import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'ion-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  exportAs: 'PopConfirmComponent',
})
export class PopConfirmComponent {
  constructor(private host: ElementRef<HTMLElement>) {}

  close(): void {
    this.host.nativeElement.remove();
  }
}
