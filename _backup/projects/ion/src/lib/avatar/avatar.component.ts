import { Component, Input, OnInit } from '@angular/core';
import { AvatarType } from '../core/types/avatar';
import { SizeType } from '../core/types/size';
import { IconType } from '../core/types/icon';

@Component({
  selector: 'ion-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class IonAvatarComponent implements OnInit {
  @Input() type: AvatarType;
  @Input() size: SizeType = 'md';
  @Input() value?: string;
  @Input() image?: string;
  @Input() onErrorImage?: string;

  initials: string;
  icon: IconType = 'union';

  ngOnInit(): void {
    if (this.type === AvatarType.initials) {
      this.initials = this.getInitials(this.value) || '--';
      return;
    }
  }

  private getInitials(name: string): string {
    return (
      name &&
      name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    );
  }
}
