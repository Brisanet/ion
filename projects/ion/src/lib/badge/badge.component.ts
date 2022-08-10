import { Component, Input } from '@angular/core';
import { IconType } from '../icon/icon.component';

export type BadgeType = 'primary' | 'secondary' | 'neutral' | 'negative';

export interface BadgeProps {
  label?: string;
  value?: number;
  icon?: IconType;
  type: BadgeType;
}

@Component({
  selector: 'ion-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() label?: string;
  @Input() value?: number;
  @Input() type!: BadgeType;

  public valueInBadge: string;

  private exists(value: number): boolean {
    return value !== undefined && value !== null && !isNaN(value);
  }

  private limitValue(value: number): string {
    const maxValue = 99;
    if (value > maxValue) {
      return `${maxValue}+`;
    }
    return value && value.toString();
  }

  formatValue(): string {
    return this.exists(this.value) ? this.limitValue(this.value) : this.label;
  }

  ngOnInit() {
    this.valueInBadge = this.formatValue();
  }
}
