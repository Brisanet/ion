export enum Highlight {
  SIMPLE = 'simple',
  DOUBLE = 'double',
  NONE = 'none',
}

export type ContainerStyle = {
  size: string;
  color: string;
};

import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { iconsPaths } from './svgs/icons';
import { IconType } from '../core/types/icon';

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

  get outsideContainerStyle(): ContainerStyle {
    let color: string;
    let size: string;

    if (this.isHex()) {
      if (
        this.highlight === Highlight.SIMPLE ||
        this.highlight === Highlight.DOUBLE
      ) {
        color = `${this.color}1A`;
        size = `${this.size * 2.25}px`;
      } else {
        size = `${this.size}px`;
        color = 'transparent';
      }
    }

    return {
      color,
      size,
    };
  }

  get innerContainerStyle(): ContainerStyle {
    let color: string;
    let size: string;

    if (this.isHex()) {
      if (this.highlight === Highlight.DOUBLE) {
        color = `${this.color}40`;
        size = `${this.size * 1.5}px`;
      } else {
        color = 'transparent';
        size = `${this.size}px`;
      }
    }

    return {
      color,
      size,
    };
  }

  constructor(private renderer: Renderer2) {}

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
  }

  private isHex(): boolean {
    return this.color.includes('#') && this.color.length === 7;
  }
}
