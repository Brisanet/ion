import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ColorScheme,
  HeadingSize,
  HeadingType,
  HeadingWeight,
} from '../../core/types/typography';
import { createElement } from '../../utils';

@Component({
  selector: 'ion-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class IonHeadingComponent implements AfterViewInit {
  @Input() text: string;
  @Input() type: HeadingType;
  @Input() weight?: HeadingWeight = 'medium';
  @Input() colorScheme?: ColorScheme = 'primary';
  @Input() size?: HeadingSize = 'normal';

  @ViewChild('heading', { static: false }) heading: ElementRef;

  ngAfterViewInit(): void {
    const heading = this.makeElement(this.type, this.text);
    this.addClass(heading, `color-${this.colorScheme}`);
    this.addClass(heading, `font-weight-${this.weight}`);
    this.addClass(heading, `font-size-${this.size}`);
    this.appendElement(heading);
  }

  private makeElement(type: HeadingType, text: string): HTMLElement {
    const element = createElement({
      type,
      text,
      attributes: [
        { key: 'data-testid', value: 'ion-heading' },
        { key: 'id', value: type },
      ],
    });
    return element;
  }

  private addClass(element: HTMLElement, className: string): void {
    element.classList.add(className);
  }

  private appendElement(element: HTMLElement): void {
    this.heading.nativeElement.appendChild(element);
  }
}
