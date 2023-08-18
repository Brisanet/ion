import { TooltipPosition } from './../core/types/tooltip';
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
import { TooltipColorScheme, TooltipTrigger } from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { IonTooltipComponent } from './tooltip.component';
import { getPositions } from './utilsTooltip';
import { TooltipService } from './tooltip.service';
import { Subscription } from 'rxjs';

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

  public subscription: Subscription;
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
    this.subscription = this.tooltipService.rerender.subscribe((response) => {
      if (response && !this.isComponentRefNull()) {
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
      this.componentRef.instance.ionTooltipTitle = this.ionTooltipTitle;
      this.componentRef.instance.ionTooltipTemplateRef =
        this.ionTooltipTemplateRef;
      this.componentRef.instance.ionTooltipColorScheme =
        this.ionTooltipColorScheme;
      this.componentRef.instance.ionTooltipPosition = this.ionTooltipPosition;

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

    this.tooltipService.hostPosition = hostPositions;

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
    if (this.ionTooltipTitle) {
      document.body.appendChild(this.createComponent());
      this.setComponentProperties();
    }
  }

  showTooltip(): void {
    if (!this.isComponentRefNull()) {
      this.componentRef.instance.ionTooltipVisible = true;
    }
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
      this.isComponentRefNull() &&
      this.isTooltipTrigger(TooltipTrigger.HOVER)
    ) {
      this.attachComponentToView();
    }
  }

  @HostListener('click') onclick(): void {
    if (this.isTooltipTrigger(TooltipTrigger.CLICK)) {
      this.isComponentRefNull()
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

  ngOnDestroy(): void {
    this.destroyComponent();
    this.subscription.unsubscribe();
  }
}
