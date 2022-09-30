import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild('modalContainer', { static: false }) modalContainer: ElementRef;
  @Input() backdropDismiss = true;
  @Input() title: string | undefined = 'Title Test';
  @Input() primaryButtonLabel = 'Confirm';
  @Input() secondaryButtonLabel = 'Cancel';

  @Output() onClose = new EventEmitter<unknown | undefined>();

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
