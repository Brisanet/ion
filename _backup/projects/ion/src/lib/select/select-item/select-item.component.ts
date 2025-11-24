import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ion-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class IonSelectItemComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Output() unselect = new EventEmitter<void>();

  onUnselect(): void {
    this.unselect.emit();
  }
}
