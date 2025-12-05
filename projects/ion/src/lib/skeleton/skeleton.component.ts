import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonVariants } from '../core/types/skeleton';

@Component({
  selector: 'ion-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class IonSkeletonComponent {
  variant = input<SkeletonVariants>('rect');
  radius = input<number | string>();
  width = input<number | string>(50);
  height = input<number | string>(50);

  variantRadius = {
    circular: '50%',
    rect: '0',
  };

  normalizedWidth = computed(() => this.convertedValue(this.width()));
  normalizedHeight = computed(() => this.convertedValue(this.height()));
  normalizedRadius = computed(() =>
    this.radius()
      ? this.convertedValue(this.radius()!)
      : this.variantRadius[this.variant()]
  );

  private isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  private convertedValue(prop: number | string): string {
    return this.isString(prop) ? prop : `${prop}px`;
  }
}
