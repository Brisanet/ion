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
  TemplateRef,
} from '@angular/core';
import {
  TooltipColorScheme,
  TooltipPosition,
  TooltipTrigger,
} from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { IonTooltipComponent } from './tooltip.component';
import { getPositions } from './utilsTooltip';

@Directive({
  selector: '[ionTooltip]',
})
export class IonTooltipDirective implements OnDestroy {
  @Input() ionTooltipTitle = '';
  @Input() ionTooltipTemplateRef: TemplateRef<void>;
  @Input() ionTooltipColorScheme: TooltipColorScheme = 'dark';
  @Input() ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  @Input() ionTooltipArrowPointAtCenter = true;
  @Input() ionTooltipTrigger: TooltipTrigger = TooltipTrigger.DEFAULT;
  @Input() ionTooltipShowDelay = 0;

  private componentRef: ComponentRef<IonTooltipComponent> = null;
  private delayTimeout: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef
  ) {}

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
    const positions = getPositions(
      hostPositions,
      this.ionTooltipArrowPointAtCenter
    );

    this.componentRef.instance.left = positions[this.ionTooltipPosition].left;
    this.componentRef.instance.top = positions[this.ionTooltipPosition].top;
  }

  attachComponentToView(): void {
    document.body.appendChild(this.createComponent());
    this.setComponentProperties();
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
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.isTooltipTrigger(TooltipTrigger.HOVER)) {
      this.destroyComponent();
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
