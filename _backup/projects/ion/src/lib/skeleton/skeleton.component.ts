import { Component, Input } from '@angular/core';
import { SkeletonVariants } from '../core/types/skeleton';

@Component({
  selector: 'ion-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class IonSkeletonComponent {
  @Input() variant: SkeletonVariants;
  @Input() radius?: number | string;
  @Input() width: number | string = 50;
  @Input() height: number | string = 50;

  variantRadius = {
    circular: '50%',
    rect: '0',
  };

  isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  convertedValue(prop: number | string): string {
    return this.isString(prop) ? prop : `${prop}px`;
  }
}
