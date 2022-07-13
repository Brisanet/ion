import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

export type SvgModule = typeof import('./svgs/icons');
export type IconType = SvgModule[keyof SvgModule];

export interface IonIconProps {
  type: IconType;
  size?: number;
  color?: string;
}

@Component({
  selector: 'ion-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
})
export class IonIconComponent implements AfterViewInit {
  @Input() type: IconType;
  @Input() size = 24;
  @Input() color = 'black';

  @ViewChild('svg', { static: false }) svg: ElementRef;

  public icons: Record<IconType, string> = {
    trash: `<path d="M9 11C9 10.4477 9.44771 10 10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44771 18 9 17.5523 9 17V11Z"/>
      <path d="M14 10C13.4477 10 13 10.4477 13 11V17C13 17.5523 13.4477 18 14 18C14.5523 18 15 17.5523 15 17V11C15 10.4477 14.5523 10 14 10Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 6C7 3.79086 8.79086 2 11 2H13C15.2091 2 17 3.79086 17 6H21C21.5523 6 22 6.44771 22 7C22 7.55229 21.5523 8 21 8H19.8675C19.8674 8.0818 19.8622 8.1646 19.8518 8.24806L18.3518 20.2481C18.2267 21.2489 17.3759 22 16.3672 22H7.63278C6.62413 22 5.77333 21.2489 5.64822 20.2481L4.14822 8.24806C4.13779 8.1646 4.13264 8.0818 4.13249 8H3C2.44771 8 2 7.55229 2 7C2 6.44771 2.44771 6 3 6H7ZM11 4H13C14.1046 4 15 4.89543 15 6H9C9 4.89543 9.89543 4 11 4ZM6.13278 8L7.63278 20H16.3672L17.8672 8H6.13278Z"/>`,
    pencil: `<path fill-rule="evenodd" clip-rule="evenodd" d="M9.05195 20.045L3.82824 20.4988C3.63764 20.5153 3.48467 20.3624 3.50123 20.1718L3.95501 14.948C4.00016 14.4283 4.23386 13.9324 4.61177 13.5545L13.6691 4.49717C14.9474 3.21887 16.9631 3.16205 18.1713 4.37025L19.6297 5.82868C20.838 7.03688 20.7811 9.05258 19.5028 10.3309L10.4455 19.3882C10.0676 19.7661 9.57171 19.9998 9.05195 20.045ZM8.87896 18.0535L5.66747 18.3325L5.94645 15.121C5.94982 15.0822 5.97106 15.0222 6.02523 14.968L13.0219 7.97135L16.0286 10.9781L9.03201 17.9748C8.97784 18.0289 8.91776 18.0502 8.87896 18.0535ZM17.4871 9.51971L18.0894 8.91742C18.6632 8.34359 18.5698 7.59566 18.2163 7.24214L16.7579 5.78371C16.4043 5.43019 15.6564 5.3368 15.0826 5.91063L14.4803 6.51292L17.4871 9.51971Z"/>`,
  };

  ngAfterViewInit() {
    this.svg.nativeElement.insertAdjacentHTML(
      'beforeend',
      this.icons[this.type]
    );
  }
}
