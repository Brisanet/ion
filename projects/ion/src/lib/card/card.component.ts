import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { SafeAny } from '../utils/safe-any';

type Pick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

type ButtonType = 'primary' | 'secondary' | 'ghost';

type ButtonBase = {
  type: ButtonType;
  nameAction: string;
  label: string;
  icon?: string;
  circular?: boolean;
};

type Header = {
  title: string;
  buttons?: ButtonBase[];
};

type FooterButton = {
  [keys in ButtonType]?: Pick<ButtonBase, 'label' | 'circular' | 'icon'>;
};

type Foote = {
  buttons?: FooterButton;
  bodyFooter?: ComponentType<SafeAny>;
};

export type CardEvent = {
  buttonAction: ButtonType;
};

export interface IonCard {
  header: Header;
  body: ComponentType<SafeAny>;
  footer?: Foote;
}

@Component({
  selector: 'ion-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardIonComponent implements AfterViewInit {
  constructor(private resolverFactory: ComponentFactoryResolver) {}

  @Input() configuration!: IonCard;
  @Output() events = new EventEmitter<CardEvent>();

  @ViewChild('body', { read: ViewContainerRef, static: false })
  public body!: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef, static: false })
  public footer!: ViewContainerRef;

  public cardEvent(type: ButtonType): void {
    this.events.emit({ buttonAction: type });
  }

  ngAfterViewInit() {
    const bodyFactory = this.resolverFactory.resolveComponentFactory(
      this.configuration.body as SafeAny
    );
    this.body.createComponent(bodyFactory);

    if (this.configuration.footer && this.configuration.footer.bodyFooter) {
      const footerFactory = this.resolverFactory.resolveComponentFactory(
        this.configuration.footer.bodyFooter as SafeAny
      );
      this.footer.createComponent(footerFactory);
    }
  }
}
