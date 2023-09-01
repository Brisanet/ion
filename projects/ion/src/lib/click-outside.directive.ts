import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<null> = new EventEmitter();
  @Input() exceptionSeletor = '';
  private firstOpen = true;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (this.firstOpen) {
      this.firstOpen = false;
      return;
    }

    if (targetElement.id && targetElement.id.includes('ion-icon')) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !this.isOnException(targetElement)) {
      this.clickOutside.emit(null);
      this.firstOpen = true;
    }
  }

  private isOnException(targetElement: HTMLElement): boolean {
    return (
      this.exceptionSeletor &&
      targetElement &&
      targetElement.className &&
      targetElement.className.includes(this.exceptionSeletor)
    );
  }
}
