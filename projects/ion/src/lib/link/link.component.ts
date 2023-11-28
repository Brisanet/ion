import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FontSize, IconSide, IconType, LinkTarget } from '../core/types';

@Component({
  selector: 'ion-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class IonLinkComponent implements OnChanges {
  @Input() label = '';
  @Input() icon: IconType;
  @Input() iconSide: IconSide = 'right';
  @Input() size: FontSize = 'sm';
  @Input() bold = false;
  @Input() disabled = false;
  @Input() target: LinkTarget = '_self';
  @Input() link?: string;
  @Output() ionOnClick = new EventEmitter<void>();

  public iconSize = 16;

  public onClick(): void {
    if (this.disabled) {
      return;
    }
    this.ionOnClick.emit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const sizeControls = {
      sm: 16,
      md: 24,
    };

    if (changes.size) {
      this.iconSize = sizeControls[this.size];
    }
  }
}
