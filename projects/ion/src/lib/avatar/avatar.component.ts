import { Component, Input, OnInit } from '@angular/core';
import { AvatarType } from '../core/types/avatar';
import { IconType } from '../icon/icon.component';

export type SizesType = 'lg' | 'md' | 'sm' | 'xs';

export interface IonAvatarProps {
  type: AvatarType;
  size: SizesType;
  value?: string;
  image?: string;
  onErrorImage?: string;
}

@Component({
  selector: 'ion-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() type: AvatarType;
  @Input() size: SizesType = 'md';
  @Input() value?: string;
  @Input() image?: string;
  @Input() onErrorImage?: string;

  public initials: string;
  public icon: IconType = 'union';

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

  ngOnInit() {
    if (this.type === 'initials') {
      this.initials = this.getInitials(this.value) || '--';
      return;
    }
  }
}
