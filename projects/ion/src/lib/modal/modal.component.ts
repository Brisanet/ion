import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild('modalContainer', { static: false }) modalContainer: ElementRef;
  @Input() canCloseOutModal = true;
  @Input() title: string | undefined = 'Teste de titulo';

  public showModal = true;

  closeModal() {
    if (this.canCloseOutModal) {
      this.showModal = !this.showModal;
    }
  }
}
