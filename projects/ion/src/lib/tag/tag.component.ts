import { Component, Input } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { Context } from '../core/types';

export interface IonTagProps {
  outline?: boolean;
  context?: Context;
  color?: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'ion-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() public outline = true;
  @Input() public label!: string;
  @Input() public context?: Context;
  @Input() public color?: string = '#505566';
  @Input() public icon?: IconType = 'trash';

  setTagType() {
    return `ion-tag ${this.outline ? 'outline' : ''} ${
      this.context ? this.context : ''
    }`;
  }

  validateColor() {
    return /^#([0-f]{6})$/.test(this.color) ? this.color : '#505566';
  }
}
