import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  computed,
} from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IconType } from '../core/types/icon';

export type IonDrawerDirection = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'ion-drawer',
  standalone: true,
  imports: [IonButtonComponent, IonIconComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ion-drawer-open]': 'isOpen()',
    '[style.--ion-drawer-size]': 'formattedSize()',
  },
})
export class IonDrawerComponent {
  isOpen = input<boolean>(false);
  direction = input<IonDrawerDirection>('right');
  title = input<string>('');
  iconTitle = input<IconType>();
  size = input<number>(30);

  ionOnClose = output<void>();

  formattedSize = computed(() => {
    const sizeValue = this.size();
    const finalSize = sizeValue > 50 ? 50 : sizeValue;
    return `${finalSize}%`;
  });

  drawerClasses = computed(() => {
    return {
      'ion-drawer-content': true,
      [`ion-drawer-${this.direction()}`]: true,
      'ion-drawer-open': this.isOpen(),
    };
  });

  close(): void {
    this.ionOnClose.emit();
  }
}
