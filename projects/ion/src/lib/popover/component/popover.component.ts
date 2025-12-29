import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from '../../button/button.component';
import { IonIconComponent } from '../../icon/icon.component';
import { IonDividerComponent } from '../../divider/divider.component';
import { PopoverPosition, PopoverButtonsProps } from '../../core/types/popover';
import { IconType } from '../../core/types/icon';
import { POPOVER_DATA } from '../popover.service';

const PRIMARY_6 = '#0858ce';

@Component({
  selector: 'ion-popover',
  imports: [
    CommonModule,
    IonButtonComponent,
    IonIconComponent,
    IonDividerComponent,
  ],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-testid': 'ion-popover',
  },
})
export class IonPopoverComponent {
  private data = inject(POPOVER_DATA, { optional: true });

  // Inputs
  ionPopoverTitle = input<string>(this.data?.ionPopoverTitle || '');
  ionPopoverKeep = input<boolean>(this.data?.ionPopoverKeep || false);
  ionPopoverBody = input(this.data?.ionPopoverBody);
  ionPopoverActions = input<PopoverButtonsProps[] | undefined>(
    this.data?.ionPopoverActions,
  );
  ionPopoverIcon = input<IconType | undefined>(this.data?.ionPopoverIcon);
  ionPopoverIconColor = input<string>(
    this.data?.ionPopoverIconColor || PRIMARY_6,
  );
  ionPopoverIconClose = input<boolean>(this.data?.ionPopoverIconClose || false);
  ionPopoverPosition = input<PopoverPosition>(
    this.data?.ionPopoverPosition || PopoverPosition.DEFAULT,
  );
  ionPopoverCustomClass = input<string>(this.data?.ionPopoverCustomClass || '');

  // Outputs
  ionOnClose = output<void>();
  ionOnFirstAction = output<void>();
  ionOnSecondAction = output<void>();

  // State
  ionPopoverVisible = signal(true);

  close(): void {
    this.ionOnClose.emit();
  }

  firstAction(): void {
    this.ionOnFirstAction.emit();
  }

  secondAction(): void {
    this.ionOnSecondAction.emit();
  }
}
