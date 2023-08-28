import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<null> = new EventEmitter();
  private firstOpen = true;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (this.firstOpen) {
      this.firstOpen = false;
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !this.isOnDropdown(targetElement)) {
      this.clickOutside.emit(null);
      this.firstOpen = true;
    }
  }

  private isOnDropdown(targetElement: HTMLElement): boolean {
    return (
      targetElement &&
      targetElement.className &&
      targetElement.className.includes('ant-select-dropdown-menu-item')
    );
  }
}
