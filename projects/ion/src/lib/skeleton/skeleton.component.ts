import { Component, Input } from '@angular/core';
import { SkeletonVariants } from '../core/types/skeleton';

enum variantRadius {
  circular = '50%',
  rect = '0',
}

@Component({
  selector: 'ion-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class IonSkeletonComponent {
  @Input() variant: SkeletonVariants;
  @Input() radius?: number;
  @Input() width = 50;
  @Input() height = 50;

  getRadius(): string {
    return this.radius ? `${this.radius}px` : variantRadius[this.variant];
  }
}
