import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[ionPopConfirm]',
})
export class PopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';

  @HostListener('mouseenter') onMouseEnter(): void {
    console.log('ionPopConfirmTitle -> ', this.ionPopConfirmTitle);
  }
}
