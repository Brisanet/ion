import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  input,
  effect,
  createComponent,
  EnvironmentInjector,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TooltipColorScheme, TooltipTrigger, TooltipPosition } from '../core/types';
import { IonTooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
import { getPositions } from './utilsTooltip';

@Directive({
  selector: '[ionTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'onClick()',
    '(window:scroll)': 'onScroll()',
  },
})
export class IonTooltipDirective implements OnDestroy, OnInit {
  ionTooltipTitle = input<string>('');
  ionTooltipTemplateRef = input<TemplateRef<void> | null>(null);
  ionTooltipColorScheme = input<TooltipColorScheme>('dark');
  ionTooltipPosition = input<TooltipPosition>(TooltipPosition.DEFAULT);
  ionTooltipArrowPointAtCenter = input<boolean>(true);
  ionTooltipTrigger = input<TooltipTrigger>(TooltipTrigger.DEFAULT);
  ionTooltipShowDelay = input<number>(0);
  ionTooltipCustomClass = input<string>('');

  public subscription$: Subscription | null = null;
  private componentRef: ComponentRef<IonTooltipComponent> | null = null;
  private delayTimeout: number | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef,
    private tooltipService: TooltipService,
    private environmentInjector: EnvironmentInjector
  ) {
    effect(() => {
      if (this.componentRef) {
        this.updateComponentProperties();
      }
    });
  }

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
    return this.ionTooltipTrigger() === trigger;
  }

  createComponent(): HTMLElement {
    this.componentRef = createComponent(IonTooltipComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector,
    });

    this.appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
  }

  updateComponentProperties(): void {
    if (!this.isComponentRefNull() && this.componentRef) {
      this.componentRef.setInput('ionTooltipTitle', this.ionTooltipTitle());
      this.componentRef.setInput('ionTooltipTemplateRef', this.ionTooltipTemplateRef());
      this.componentRef.setInput('ionTooltipColorScheme', this.ionTooltipColorScheme());
      this.componentRef.setInput('ionTooltipCustomClass', this.ionTooltipCustomClass());
    }
  }

  setComponentProperties(): void {
    if (!this.isComponentRefNull()) {
      this.updateComponentProperties();

      if (this.delayTimeout !== null) {
        window.clearTimeout(this.delayTimeout);
      }

      this.delayTimeout = window.setTimeout(
        this.showTooltip.bind(this),
        this.ionTooltipShowDelay()
      );
      this.setComponentPosition();
    }
  }

  setComponentPosition(): void {
    if (!this.componentRef) return;

    const { left, right, top, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();

    const hostPositions = { left, right, top, bottom };

    this.tooltipService.setHostPosition(hostPositions);

    const positions = getPositions(
      hostPositions,
      this.ionTooltipArrowPointAtCenter()
    );

    const currentPosition = this.componentRef.instance.ionTooltipPosition();
    this.componentRef.instance.left.set(positions[currentPosition].left);
    this.componentRef.instance.top.set(positions[currentPosition].top);
  }

  attachComponentToView(): void {
    if (this.ionTooltipTitle() || this.ionTooltipTemplateRef()) {
      document.body.appendChild(this.createComponent());
      this.setComponentProperties();
    }
  }

  showTooltip(): void {
    if (!this.isComponentRefNull() && this.componentRef) {
      this.componentRef.instance.ionTooltipVisible.set(true);
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  shouldAttachComponent(): boolean {
    const ionDropdownElement =
      this.elementRef.nativeElement.querySelector('ion-dropdown');

    return this.isComponentRefNull() && !ionDropdownElement;
  }

  destroyComponent(): void {
    if (!this.isComponentRefNull() && this.componentRef) {
      if (this.delayTimeout !== null) {
        window.clearTimeout(this.delayTimeout);
      }
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  onMouseEnter(): void {
    if (
      this.shouldAttachComponent() &&
      this.isTooltipTrigger(TooltipTrigger.HOVER)
    ) {
      this.attachComponentToView();
    }
  }

  onClick(): void {
    if (this.isTooltipTrigger(TooltipTrigger.CLICK)) {
      this.shouldAttachComponent()
        ? this.attachComponentToView()
        : this.destroyComponent();
    } else {
      this.destroyComponent();
    }
  }

  onMouseLeave(): void {
    if (this.isTooltipTrigger(TooltipTrigger.HOVER)) {
      this.destroyComponent();
    }
  }

  onScroll(): void {
    this.destroyComponent();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
