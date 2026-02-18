
import { Component, computed, input, output } from '@angular/core';
import { IonIconComponent } from '../icon/icon.component';
import { FontSize, IconSide, IconType, LinkTarget } from '../core/types';

@Component({
  selector: 'ion-link',
  standalone: true,
  imports: [IonIconComponent],
  templateUrl: './ion-link.component.html',
  styleUrls: ['./ion-link.component.scss'],
})
export class IonLinkComponent {
  label = input<string>('');
  icon = input<IconType>();
  iconSide = input<IconSide>('right');
  size = input<FontSize>('sm');
  bold = input<boolean>(false);
  disabled = input<boolean>(false);
  target = input<LinkTarget>('_self');
  link = input<string>();

  ionOnClick = output<void>();

  iconSize = computed(() => {
    const sizeControls = {
      sm: 16,
      md: 24,
    };
    return sizeControls[this.size()];
  });

  public onClick(): void {
    if (this.disabled()) {
      return;
    }
    this.ionOnClick.emit();
  }
}
