import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class BadgeComponent implements OnChanges, OnInit {
  @Input() label?: string;
  @Input() value?: number;
  @Input() type!: BadgeType;

  valueInBadge: string;

  ngOnInit(): void {
    this.valueInBadge = this.formatValue();
  }

  ngOnChanges(): void {
    this.valueInBadge = this.formatValue();
  }

  formatValue(): string {
    return this.exists(this.value) ? this.limitValue(this.value) : this.label;
  }

  private exists(value: number): boolean {
    return value !== null && !isNaN(value);
  }

  private limitValue(value: number): string {
    const maxValue = 99;
    if (value > maxValue) {
      return `${maxValue}+`;
    }
    return value && value.toString();
  }
}
