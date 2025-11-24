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
import { SafeAny } from '../utils/safe-any';
import { IonCard, CardEvent } from '../core/types/card';

@Component({
  selector: 'ion-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class IonCardComponent implements AfterViewInit, OnDestroy {
  @Input() configuration!: IonCard;
  @Output() events = new EventEmitter<CardEvent>();

  @ViewChild('body', { read: ViewContainerRef, static: false })
  body!: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef, static: false })
  footer!: ViewContainerRef;

  private indexOfChipSelected: number | null = null;

  constructor(
    private resolverFactory: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.ngOnDestroy();
    if (this.configuration.body) {
      const bodyFactory = this.resolverFactory.resolveComponentFactory(
        this.configuration.body as SafeAny
      );
      this.body.createComponent(bodyFactory).changeDetectorRef.detectChanges();
    }
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
