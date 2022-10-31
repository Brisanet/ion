import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[default]',
})
export class DefaultImageDirective {
  @Input()
  @HostBinding('src')
  src: string;

  @Input() default: string;

  @HostListener('error')
  updateUrl(): void {
    this.src = this.default;
  }
}
