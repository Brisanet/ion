import {
  Component,
  ElementRef,
  computed,
  input,
  viewChild,
  effect,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { iconsPaths } from './svgs/icons';
import { ContainerStyle, Highlight, IconType } from '../core/types/icon';

@Component({
  selector: 'ion-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IonIconComponent {
  type = input.required<IconType>();
  size = input<number>(24);
  color = input<string>('#282b33');
  highlight = input<Highlight>(Highlight.NONE);

  svgElement = viewChild<ElementRef>('svgElement');

  private sanitizer = inject(DomSanitizer);

  paths = computed(() => {
    const iconType = this.type();
    if (iconsPaths[iconType]) {
      const paths = iconsPaths[iconType].split('/>');
      const result = paths
        .map((path, index) => {
          return path.includes('path')
            ? `${path} id="ion-icon-path-${iconType}-${index}" />`
            : '';
        })
        .join('');
      return this.sanitizer.bypassSecurityTrustHtml(result);
    }
    return '';
  });

  isHex = computed(() => {
    const regex = /^#?([0-9A-Fa-f]{6})$/;
    return regex.test(this.color());
  });

  circleProportion = computed(() => {
    const mdIcon = 24;
    const proportions = {
      largeIcon: {
        inner: 1.5,
        outer: 2.25,
      },
      smallIcon: {
        inner: 1.75,
        outer: 2.5,
      },
    };

    const iconSize = this.size() >= mdIcon ? 'largeIcon' : 'smallIcon';

    return {
      innerCircle: proportions[iconSize].inner,
      outsideCircle: proportions[iconSize].outer,
    };
  });

  outerContainerStyle = computed<ContainerStyle>(() => {
    if (!this.isHex()) {
      return {
        color: 'transparent',
        size: 'unset',
      };
    }

    const defaultStyle = {
      color: 'transparent',
      size: 'unset',
    };

    const stylesControl = {
      double: {
        color: `${this.color()}1A`,
        size: `${this.size() * this.circleProportion().outsideCircle}px`,
      },
      simple: {
        color: `${this.color()}1A`,
        size: `${this.size() * 2}px`,
      },
      none: defaultStyle,
    };

    return {
      color: stylesControl[this.highlight()].color,
      size: stylesControl[this.highlight()].size,
    };
  });

  innerContainerStyle = computed<ContainerStyle>(() => {
    if (!this.isHex()) {
      return {
        color: 'transparent',
        size: 'unset',
      };
    }

    const defaultStyle = {
      color: 'transparent',
      size: 'unset',
    };

    const stylesControl = {
      double: {
        color: `${this.color()}40`,
        size: `${this.size() * this.circleProportion().innerCircle}px`,
      },
      simple: defaultStyle,
      none: defaultStyle,
    };

    return {
      color: stylesControl[this.highlight()].color,
      size: stylesControl[this.highlight()].size,
    };
  });
}
