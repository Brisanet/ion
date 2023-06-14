import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<null> = new EventEmitter();
  @Input() clickOutsideKeep = false;
  private firstOpen = true;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (this.firstOpen) {
      this.firstOpen = false;
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !this.clickOutsideKeep) {
      this.clickOutside.emit(null);
      this.firstOpen = true;
    }
  }
}
