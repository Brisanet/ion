import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
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

  @ViewChild('svgElement', { static: true }) svgElement: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type && iconsPaths[this.type]) {
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
