import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon/icon.component';
import { IonBadgeComponent } from '../badge/badge.component';
import { IconType, TabSize, TabDirection, TabBadge } from '../core/types';

@Component({
  selector: 'ion-tab',
  imports: [CommonModule, IonIconComponent, IonBadgeComponent],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTabComponent {
  label = input.required<string>();
  tabSize = input<TabSize>('sm');
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
  direction = input<TabDirection>('bottom');
  iconType = input<IconType | undefined>(undefined);
  badge = input<TabBadge | undefined>(undefined);

  onSelect = output<void>();

  select(): void {
    if (!this.disabled()) {
      this.onSelect.emit();
    }
  }
}
