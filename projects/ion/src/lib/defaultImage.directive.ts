import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '[src]': 'src',
  },
})
export class DefaultImageDirective {
  @Input() src: string;
  @Input() default: string;

  @HostListener('error')
  updateUrl() {
    this.src = this.default;
  }
}
