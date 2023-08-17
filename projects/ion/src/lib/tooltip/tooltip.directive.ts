import {
  AfterViewChecked,
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
export class IonTooltipDirective implements OnDestroy, AfterViewChecked {
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

  ngAfterViewChecked(): void {
    if (
      this.componentRef &&
      this.componentRef.instance.getCoordinates().top < 0
    ) {
      console.log(this.componentRef.instance.getCoordinates());
      this.ionTooltipPosition = TooltipPosition.TOP_CENTER;
    }
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
    const positions = getPositions(
      hostPositions,
      this.ionTooltipArrowPointAtCenter
    );

    const TOOLTIP_MAX_WIDTH = 224;
    const SPACE_BETWEEN_HOST_AND_SCREEN_END = document.body.clientWidth - right;
    // console.log(this.componentRef.instance.ionTooltipPosition);
    // this.componentRef.instance.getHeight(
    //   this.elementRef.nativeElement.getBoundingClientRect()
    // );
    //console.log(this.componentRef.instance.ionTooltipPosition);
    // console.log('real width', width);
    // console.log('espaço restante na tela?', SPACE_BETWEEN_HOST_AND_SCREEN_END);
    // console.log('host positions', hostPositions);
    // console.log(
    //   'tem espaço?',
    //   SPACE_BETWEEN_HOST_AND_SCREEN_END + width / 2 > TOOLTIP_MAX_WIDTH / 2
    // );

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
  }
}
