import { Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { iconsPaths } from './svgs/icons';

export type SvgModule = typeof import('./svgs/icons');
export type IconType = keyof typeof iconsPaths;

export interface IonIconProps {
  type: IconType;
  size?: number;
  color?: string;
}

@Component({
  selector: 'ion-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IonIconComponent {
  @Input() type: IconType;
  @Input() size = 24;
  @Input() color = '#282b33';

  constructor(private sanitizer: DomSanitizer, private el: ElementRef) {}

  getPath(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(iconsPaths[this.type]);
  }
}
