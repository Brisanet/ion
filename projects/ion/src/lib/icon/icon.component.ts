import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
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
export class IonIconComponent implements AfterViewInit {
  @Input() type: IconType;
  @Input() size = 24;
  @Input() color = '#282b33';

  @ViewChild('svgElement', { static: true }) svgElement: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.svgElement) {
      return;
    }

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
}
