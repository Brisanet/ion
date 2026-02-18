import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import {
  HeadingType,
  HeadingWeight,
  ColorScheme,
  HeadingSize,
} from '../../core/types/typography';

@Component({
  selector: 'ion-heading',
  standalone: true,
  imports: [],
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-testid]': '"ion-heading-host"',
  },
})
export class IonHeadingComponent {
  text = input.required<string>();
  type = input.required<HeadingType>();
  weight = input<HeadingWeight>('medium');
  colorScheme = input<ColorScheme>('primary');
  size = input<HeadingSize>('normal');

  classes = computed(() => {
    return [
      `color-${this.colorScheme()}`,
      `font-weight-${this.weight()}`,
      `font-size-${this.size()}`,
    ].join(' ');
  });
}
