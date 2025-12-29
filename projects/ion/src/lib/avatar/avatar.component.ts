import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { AvatarType } from '../core/types/avatar';
import { SizeType } from '../core/types/size';
import { IconType } from '../core/types/icon';
import { IonIconComponent } from '../icon/icon.component';

@Component({
  selector: 'ion-avatar',
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class IonAvatarComponent {
  type = input.required<AvatarType>();
  size = input<SizeType>('md');
  value = input<string>();
  image = input<string>();
  onErrorImage = input<string>();

  icon: IconType = 'union';

  initials = computed(() => {
    if (this.type() === AvatarType.initials) {
      return this.getInitials(this.value()) || '--';
    }
    return '';
  });

  private getInitials(name: string | undefined): string {
    if (!name) return '';

    return name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
