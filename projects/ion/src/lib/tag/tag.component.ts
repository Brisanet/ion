import { Component, Input, OnInit } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { TagStatus } from '../core/types';
import { validateHexColor } from '../utils';

export interface IonTagProps {
  outline?: boolean;
  status?: TagStatus;
  color?: string;
  label: string;
  icon?: string;
}

const defaultColor = '#505566';

@Component({
  selector: 'ion-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() public outline = true;
  @Input() public label!: string;
  @Input() public status?: TagStatus;
  @Input() public color?: string = defaultColor;
  @Input() public icon?: IconType;

  setTagType() {
    return `ion-tag ${this.outline ? 'outline' : ''} ${
      this.status ? this.status : ''
    }`;
  }

  tagStyle() {
    return !this.status && this.getTagColor();
  }

  getTagColor() {
    return validateHexColor(this.color) ? this.color : defaultColor;
  }

  validateLabel() {
    if (!this.label || this.label.trim() === '') {
      throw new Error('Invalid Tag label informed');
    }
  }

  ngOnInit(): void {
    this.validateLabel();
  }
}
