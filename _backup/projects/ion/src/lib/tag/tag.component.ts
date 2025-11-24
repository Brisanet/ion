import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TagStatus } from '../core/types';
import { IconType } from '../core/types/icon';
import { validateHexColor } from '../utils';

const defaultColor = '#505566';

@Component({
  selector: 'ion-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class IonTagComponent implements OnInit, OnChanges {
  @Input() outline = true;
  @Input() label!: string;
  @Input() status?: TagStatus;
  @Input() color?: string = defaultColor;
  @Input() backgroundColor?: string;
  @Input() icon?: IconType;

  ngOnInit(): void {
    this.validateLabel();
  }

  ngOnChanges(): void {
    this.validateLabel();
  }

  setTagType(): string {
    return `ion-tag ${this.outline ? 'outline' : ''} ${
      this.status ? this.status : ''
    }`;
  }

  tagStyle(): string {
    return !this.status && this.getTagColor();
  }

  getTagColor(): string {
    return validateHexColor(this.color) ? this.color : defaultColor;
  }

  tagBackgroundColor(): string {
    if (this.status) {
      return '';
    }

    if (this.backgroundColor && validateHexColor(this.backgroundColor)) {
      return this.backgroundColor;
    }

    return this.tagStyle() + '1A';
  }

  hasLabel(): boolean {
    return !this.label || String(this.label).trim() === '';
  }

  validateLabel(): void {
    if (this.hasLabel()) {
      throw new Error('Invalid Tag label informed');
    }
  }
}
