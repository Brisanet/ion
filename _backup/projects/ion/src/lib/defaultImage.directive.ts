import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[default]',
})
export class DefaultImageDirective {
  @Input()
  @HostBinding('src')
  src: string;

  @Input() default: string;

  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;

  @HostListener('error')
  updateUrl(): void {
    this.src = this.default;
    this.height = 'calc(100% - 8px)';
    this.width = 'calc(100% - 8px)';
  }
}
