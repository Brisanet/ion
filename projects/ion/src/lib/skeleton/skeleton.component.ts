import { Component, Input } from '@angular/core';
import { SkeletonVariants } from '../core/types/skeleton';

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

  variantRadius = {
    circular: '50%',
    rect: '0',
  };
}
