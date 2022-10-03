import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModalProps } from '../classes/modal.interface';

@Component({
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild('modalContainer', { static: false }) modalContainer: ElementRef;
  @Input() backdropDismiss = true;
  @Input() primaryButtonLabel = 'Confirm';
  @Input() secondaryButtonLabel = 'Cancel';
  @Input() config: IonModalProps;
  @Output()
  ionOnClose = new EventEmitter<unknown | undefined>();

  public showModal = true;

  outsideClick() {
    if (this.backdropDismiss) {
      this.closeModal();
    }
  }

  closeModal(emitValue?: unknown | undefined) {
    this.ionOnClose.emit(emitValue);
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
