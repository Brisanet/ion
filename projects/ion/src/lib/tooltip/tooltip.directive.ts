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
} from '@angular/core';
import {
  TooltipColorScheme,
  TooltipPosition,
  TooltipTrigger,
} from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { TooltipComponent } from './tooltip.component';
import { getPositions } from './utilsTooltip';

@Directive({
  selector: '[ionTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() ionTooltipTitle = '';
  @Input() ionTooltipColorScheme: TooltipColorScheme = 'dark';
  @Input() ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  @Input() ionTooltipTrigger: TooltipTrigger = TooltipTrigger.DEFAULT;
  @Input() ionTooltipShowDelay = 0;

  private componentRef: ComponentRef<TooltipComponent> = null;
  private delayTimeout: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef
  ) {}

  createComponent(): HTMLElement {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);

    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<SafeAny>)
      .rootNodes[0];
  }

  setComponentProperties(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.ionTooltipTitle = this.ionTooltipTitle;
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

    const positions = getPositions({ left, right, top, bottom });

    this.componentRef.instance.left = positions[this.ionTooltipPosition].left;
    this.componentRef.instance.top = positions[this.ionTooltipPosition].top;
  }

  attachComponentToView(): void {
    document.body.appendChild(this.createComponent());
    this.setComponentProperties();
  }

  showTooltip(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.ionTooltipVisible = true;
    }
  }

  destroyComponent(): void {
    if (this.componentRef !== null) {
      window.clearTimeout(this.delayTimeout);
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    if (this.componentRef === null && this.ionTooltipTrigger === 'hover') {
      this.attachComponentToView();
    }
  }

  @HostListener('click') onclick(): void {
    if (this.ionTooltipTrigger === 'click') {
      this.componentRef === null
        ? this.attachComponentToView()
        : this.destroyComponent();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.ionTooltipTrigger === 'hover') {
      this.destroyComponent();
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
