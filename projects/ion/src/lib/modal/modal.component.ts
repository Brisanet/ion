import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild('modalContainer', { static: false }) modalContainer: ElementRef;
  @Input() backdropDismiss = true;
  @Input() title: string | undefined = 'Teste de titulo';
  @Input() primaryButtonLabel = 'Confirmar';
  @Input() secondaryButtonLabel = 'Cancelar';

  @Output() onClose = new EventEmitter();

  public showModal = true;

  outsideClick() {
    if (this.backdropDismiss) {
      this.closeModal();
    }
  }

  closeModal(emitValue?: unknown | undefined) {
    this.showModal = false;
    this.onClose.emit(emitValue);
  }

  secondaryButtonClicked() {
    console.log('secondaryButtonClicked btn');
    this.closeModal(false);
  }

  primaryButtonClicked() {
    console.log('primaryButtonClicked btn');
    this.closeModal(true);
  }
}
