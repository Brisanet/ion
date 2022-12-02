import { IonChipProps } from './../chip/chip.component';
import { ComponentType } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IconType } from '../icon/icon.component';
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
  chips?: IonChipProps[];
  icon?: IconType;
};

type FooterButton = {
  [keys in ButtonType]?: Pick<ButtonBase, 'label' | 'circular' | 'icon'>;
};

type Foote = {
  buttons?: FooterButton;
  body?: ComponentType<SafeAny>;
};

export type CardEvent = {
  buttonAction?: ButtonType;
  chipSelected?: { chip: IonChipProps; index: number };
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
export class CardIonComponent implements AfterViewInit, OnDestroy {
  @Input() configuration!: IonCard;
  @Output() events = new EventEmitter<CardEvent>();

  @ViewChild('body', { read: ViewContainerRef, static: false })
  body!: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef, static: false })
  footer!: ViewContainerRef;

  private indexOfChipSelected = 0;

  constructor(
    private resolverFactory: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.ngOnDestroy();
    const bodyFactory = this.resolverFactory.resolveComponentFactory(
      this.configuration.body as SafeAny
    );
    this.body.createComponent(bodyFactory).changeDetectorRef.detectChanges();
    if (this.configuration.footer && this.configuration.footer.body) {
      const footerFactory = this.resolverFactory.resolveComponentFactory(
        this.configuration.footer.body as SafeAny
      );
      this.footer
        .createComponent(footerFactory)
        .changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.body) {
      this.body.detach();
    }
    if (this.footer) {
      this.footer.detach();
    }
  }

  cardEvent(event: CardEvent): void {
    this.events.emit(event);
    if (event.chipSelected) this.indexOfChipSelected = event.chipSelected.index;
  }

  isChipSelected(chipIndex: number): boolean {
    return this.indexOfChipSelected === chipIndex;
  }
}
