import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { iconsPaths } from './svgs/icons';
import { ContainerStyle, Highlight, IconType } from '../core/types/icon';

@Component({
  selector: 'ion-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IonIconComponent implements OnChanges {
  @Input() type: IconType;
  @Input() size = 24;
  @Input() color = '#282b33';
  @Input() highlight: Highlight = Highlight.NONE;

  @ViewChild('svgElement', { static: true }) svgElement: ElementRef;

  outerContainerStyle: ContainerStyle = {
    color: 'transparent',
    size: 'unset',
  };

  innerContainerStyle: ContainerStyle = {
    color: 'transparent',
    size: 'unset',
  };

  constructor(private renderer: Renderer2) {}

  setOuterContainerStyle(): void {
    const defaultStyle = {
      color: 'transparent',
      size: 'unset',
    };

    const stylesControl = {
      double: {
        color: `${this.color}1A`,
        size: `${this.size * this.getCircleProportion().outsideCircle}px`,
      },
      simple: {
        color: `${this.color}1A`,
        size: `${this.size * 2}px`,
      },
      none: defaultStyle,
    };

    this.outerContainerStyle = {
      color: stylesControl[this.highlight].color,
      size: stylesControl[this.highlight].size,
    };
  }

  setInnerContainerStyle(): void {
    const defaultStyle = {
      color: 'transparent',
      size: 'unset',
    };

    const stylesControl = {
      double: {
        color: `${this.color}40`,
        size: `${this.size * this.getCircleProportion().innerCircle}px`,
      },
      simple: defaultStyle,
      none: defaultStyle,
    };

    this.innerContainerStyle = {
      color: stylesControl[this.highlight].color,
      size: stylesControl[this.highlight].size,
    };
  }

  ngOnChanges(): void {
    if (iconsPaths[this.type]) {
      const paths = iconsPaths[this.type].split('/>');
      const resultPaths = paths
        .map((path, index) => {
          return path.includes('path')
            ? `${path} id="ion-icon-path-${this.type}-${index}" />`
            : '';
        })
        .join('');

      this.renderer.setProperty(
        this.svgElement.nativeElement,
        'innerHTML',
        resultPaths
      );
    }

    if (this.isHex()) {
      this.setInnerContainerStyle();
      this.setOuterContainerStyle();
    }
  }

  private isHex(): boolean {
    const regex = /^#?([0-9A-Fa-f]{6})$/;
    return regex.test(this.color);
  }

  private getCircleProportion(): {
    innerCircle: number;
    outsideCircle: number;
  } {
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

    const iconSize = this.size >= mdIcon ? 'largeIcon' : 'smallIcon';

    return {
      innerCircle: proportions[iconSize].inner,
      outsideCircle: proportions[iconSize].outer,
    };
  }
}
