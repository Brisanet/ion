import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IconType } from '../core/types/icon';
import { IonButtonProps } from '../core/types/button';
import { IonCardFooterComponent } from '../card/card-footer.component';

export type IonDrawerDirection = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'ion-drawer',
  standalone: true,
  imports: [CommonModule, IonButtonComponent, IonIconComponent, IonCardFooterComponent],
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
  secondaryButton = input<IonButtonProps>();
  submitButton = input<IonButtonProps>();
  cancelButton = input<IonButtonProps>();

  ionOnSubmit = output<void>();
  ionOnCancel = output<void>();
  ionOnSecondary = output<void>();

  ionOnClose = output<void>();
  maxWidth = 75;

  formattedSize = computed(() => {
    const sizeValue = this.size();
    const finalSize = sizeValue > this.maxWidth ? this.maxWidth : sizeValue;
    return `${finalSize}%`;
  });

  drawerClasses = computed(() => {
    return {
      'ion-drawer-content': true,
      [`ion-drawer-${this.direction()}`]: true,
      'ion-drawer-open': this.isOpen(),
    };
  });

  secondary(): void {
    this.ionOnSecondary.emit();
  }

  close(): void {
    this.ionOnClose.emit();
  }

  submit(): void {
    this.ionOnSubmit.emit();
  }

  cancel(): void {
    this.ionOnCancel.emit();
  }
}
