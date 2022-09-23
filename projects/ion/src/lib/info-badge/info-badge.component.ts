import { Component, Input, OnChanges } from '@angular/core';
import {
  Sizes,
  IconTypes,
  VariantTypes,
  IconSizeOptions,
} from '../core/types/info-badge';

export interface InfoBadgeProps {
  variant: VariantTypes;
  icon?: IconTypes;
  text?: string;
  size?: Sizes;
}

@Component({
  selector: 'ion-info-badge',
  templateUrl: './info-badge.component.html',
  styleUrls: ['./info-badge.component.scss'],
})
export class InfoBadgeComponent implements OnChanges {
  @Input() public variant: VariantTypes = 'primary';
  @Input() public icon?: IconTypes;
  @Input() public text?: string;
  @Input() public size?: Sizes = 'md';

  public iconSize: IconSizeOptions;

  ngOnChanges() {
    this.iconSize = IconSizeOptions[this.size];
  }
}
