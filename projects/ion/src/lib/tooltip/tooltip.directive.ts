import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TooltipColorScheme, TooltipTrigger } from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { TooltipPosition } from './../core/types/tooltip';
import { IonTooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
import { getPositions } from './utilsTooltip';

@Directive({
  selector: '[ionTooltip]',
})
export class IonTooltipDirective implements OnDestroy, OnInit {
  @Input() ionTooltipTitle = '';
  @Input() ionTooltipTemplateRef: TemplateRef<void>;
  @Input() ionTooltipColorScheme: TooltipColorScheme = 'dark';
  @Input() ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  @Input() ionTooltipArrowPointAtCenter = true;
  @Input() ionTooltipTrigger: TooltipTrigger = TooltipTrigger.DEFAULT;
  @Input() ionTooltipShowDelay = 0;
  @Input() ionTooltipCustomClass: string;

  public subscription$: Subscription;
  private componentRef: ComponentRef<IonTooltipComponent> = null;
  private delayTimeout: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef,
    private tooltipService: TooltipService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.tooltipService.reposition.subscribe(() => {
      if (!this.isComponentRefNull()) {
        this.setComponentPosition();
      }
    });
  }

  isComponentRefNull(): boolean {
    return this.componentRef === null;
  }

  isTooltipTrigger(trigger: TooltipTrigger): boolean {
    return this.ionTooltipTrigger === trigger;
  }

  createComponent(): HTMLElement {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        IonTooltipComponent
      );

    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<SafeAny>)
      .rootNodes[0];
  }

  setComponentProperties(): void {
    if (!this.isComponentRefNull()) {
      const instanceProps = {
        ionTooltipTitle: this.ionTooltipTitle,
        ionTooltipTemplateRef: this.ionTooltipTemplateRef,
        ionTooltipColorScheme: this.ionTooltipColorScheme,
        ionTooltipPosition: this.ionTooltipPosition,
        ionTooltipCustomClass: this.ionTooltipCustomClass,
      };

      Object.keys(instanceProps).forEach((prop) => {
        this.componentRef.instance[prop] = instanceProps[prop];
      });

      this.delayTimeout = window.setTimeout(
        this.showTooltip.bind(this),
        this.ionTooltipShowDelay
      );
      this.setComponentPosition();
    }
  }

  setComponentPosition(): void {
    const { left, right, top, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();

    const hostPositions = { left, right, top, bottom };

    this.tooltipService.setHostPosition(hostPositions);

    const positions = getPositions(
      hostPositions,
      this.ionTooltipArrowPointAtCenter
    );

    this.componentRef.instance.left =
      positions[this.componentRef.instance.ionTooltipPosition].left;
    this.componentRef.instance.top =
      positions[this.componentRef.instance.ionTooltipPosition].top;
  }

  attachComponentToView(): void {
    if (this.ionTooltipTitle || this.ionTooltipTemplateRef) {
      document.body.appendChild(this.createComponent());
      this.setComponentProperties();
    }
  }

  showTooltip(): void {
    if (!this.isComponentRefNull()) {
      this.componentRef.instance.ionTooltipVisible = true;
    }
  }

  shouldAttachComponent(): boolean {
    const ionDropdownElement =
      this.elementRef.nativeElement.querySelector('ion-dropdown');

    return this.isComponentRefNull() && !ionDropdownElement;
  }

  destroyComponent(): void {
    if (!this.isComponentRefNull()) {
      window.clearTimeout(this.delayTimeout);
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    if (
      this.shouldAttachComponent() &&
      this.isTooltipTrigger(TooltipTrigger.HOVER)
    ) {
      this.attachComponentToView();
    }
  }

  @HostListener('click') onClick(): void {
    if (this.isTooltipTrigger(TooltipTrigger.CLICK)) {
      this.shouldAttachComponent()
        ? this.attachComponentToView()
        : this.destroyComponent();
    } else {
      this.destroyComponent();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.isTooltipTrigger(TooltipTrigger.HOVER)) {
      this.destroyComponent();
    }
  }

  @HostListener('window:scroll') onScroll(): void {
    this.destroyComponent();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    this.subscription$.unsubscribe();
  }
}
