import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  OnDestroy,
  ViewContainerRef,
  input,
  output,
  effect,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  PopoverPosition,
  PopoverTrigger,
  PopoverButtonsProps,
} from '../core/types/popover';
import { IonPositionService } from '../position';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { getPositionsPopover } from './utilsPopover';
import { IconType } from '../core/types/icon';

@Directive({ 
  selector: '[ionPopover]',
  standalone: true,
  host: {
    '(click)': 'onClick()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave($event)',
    '(window:scroll)': 'onScroll($event)',
    '(document:scroll)': 'onScroll($event)',
    '(body:scroll)': 'onScroll($event)',
    '(window:wheel)': 'onScroll($event)',
  },
})
export class IonPopoverDirective implements OnDestroy {
  ionPopoverTitle = input<string>('');
  ionPopoverKeep = input<boolean>(false);
  ionPopoverBody = input<any>(null);
  ionPopoverActions = input<PopoverButtonsProps[] | undefined>(undefined);
  ionPopoverIcon = input<IconType | undefined>(undefined);
  ionPopoverIconColor = input<string | undefined>(undefined);
  ionPopoverIconClose = input<boolean>(false);
  ionPopoverPosition = input<PopoverPosition>(PopoverPosition.DEFAULT);
  ionPopoverArrowPointAtCenter = input<boolean>(true);
  ionPopoverCustomClass = input<string>('');
  ionPopoverTrigger = input<PopoverTrigger>(PopoverTrigger.DEFAULT);
  ionPopoverClose = input<Subject<void> | undefined>(undefined);
  ionPopoverStopCloseOnScroll = input<boolean>(false);
  ionPopoverAutoReposition = input<boolean>(true);

  ionOnFirstAction = output<void>();
  ionOnSecondAction = output<void>();
  ionOnClose = output<void>();

  private popoverComponentRef: ComponentRef<IonPopoverComponent> | null = null;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private appRef: ApplicationRef,
    private positionService: IonPositionService,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {
    effect(() => {
      const closeSubject = this.ionPopoverClose();
      if (closeSubject && this.popoverComponentRef) {
        closeSubject.subscribe(() => {
          this.closeAllPopovers();
          this.ionOnClose.emit();
        });
      }
    });
  }

  open(): void {
    this.closeAllPopovers();
    this.createPopover();
  }

  createPopover(): void {
    this.popoverComponentRef = createComponent(IonPopoverComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector,
    });

    this.appRef.attachView(this.popoverComponentRef.hostView);

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);
    this.popoverComponentRef.changeDetectorRef.detectChanges();
    this.updatePopoverDirectiveProps();
    this.showPopover();
    this.setComponentPosition();
  }

  updatePopoverDirectiveProps(): void {
    if (!this.popoverComponentRef) return;

    this.popoverComponentRef.setInput('ionPopoverTitle', this.ionPopoverTitle());
    this.popoverComponentRef.setInput('ionPopoverKeep', this.ionPopoverKeep());
    this.popoverComponentRef.setInput('ionPopoverBody', this.ionPopoverBody());
    this.popoverComponentRef.setInput('ionPopoverActions', this.ionPopoverActions());
    this.popoverComponentRef.setInput('ionPopoverIcon', this.ionPopoverIcon());
    this.popoverComponentRef.setInput('ionPopoverIconColor', this.ionPopoverIconColor());
    this.popoverComponentRef.setInput('ionPopoverIconClose', this.ionPopoverIconClose());
    this.popoverComponentRef.setInput('ionPopoverCustomClass', this.ionPopoverCustomClass());

    this.popoverComponentRef.instance.ionOnFirstAction.subscribe(() => {
      this.handlePopoverAction(0);
      this.ionOnFirstAction.emit();
    });

    this.popoverComponentRef.instance.ionOnSecondAction.subscribe(() => {
      this.handlePopoverAction(1);
      this.ionOnSecondAction.emit();
    });

    this.popoverComponentRef.instance.ionOnClose.subscribe(() => {
      this.destroyComponent();
      this.ionOnClose.emit();
    });
  }

  handlePopoverAction(index: number): void {
    const actions = this.ionPopoverActions();
    const action = actions && actions[index];
    if (!action || !action.keepOpenAfterAction) {
      this.destroyComponent();
    }
  }

  setComponentPosition(): void {
    if (!this.popoverComponentRef) return;

    const hostElement = this.elementRef.nativeElement.getBoundingClientRect();

    this.positionService.setHostPosition(hostElement);
    this.positionService.setChoosedPosition(
      this.popoverComponentRef.instance.ionPopoverPosition()
    );
    this.positionService.setPointAtCenter(this.ionPopoverArrowPointAtCenter());
    this.positionService.setAutoReposition(this.ionPopoverAutoReposition());

    const ionPopoverPosition =
      this.positionService.getNewPosition(getPositionsPopover);

    this.popoverComponentRef.instance.top.set(ionPopoverPosition.top + window.scrollY);
    this.popoverComponentRef.instance.left.set(ionPopoverPosition.left + window.scrollX);
    this.popoverComponentRef.instance.position.set('absolute');
    this.popoverComponentRef.instance.ionPopoverTrigger.set(this.ionPopoverTrigger());
  }

  showPopover(): void {
    if (!this.isComponentRefNull()) {
      this.popoverComponentRef!.instance.ionPopoverVisible.set(true);
    }
  }

  closeAllPopovers(): void {
    const existingPopovers = document.querySelectorAll('ion-popover');
    if (existingPopovers) {
      existingPopovers.forEach((popover) => {
        popover.remove();
      });
      this.destroyComponent();
    }
  }

  elementIsEnabled(element: HTMLElement): boolean {
    const disabled = element.getAttribute('ng-reflect-disabled');
    return !disabled || disabled === 'false';
  }

  onClick(): void {
    this.handlePopoverTrigger(PopoverTrigger.CLICK);
  }

  onMouseEnter(): void {
    this.handlePopoverTrigger(PopoverTrigger.HOVER);
    if (
      this.isPopoverTrigger(PopoverTrigger.HOVER) &&
      !this.isComponentRefNull()
    ) {
      this.popoverComponentRef!.location.nativeElement.addEventListener(
        'mouseleave',
        (e: MouseEvent) => {
          this.handleHoverOutside(e);
        }
      );
    }
  }

  onMouseLeave(event: MouseEvent): void {
    if (
      this.isPopoverTrigger(PopoverTrigger.HOVER) &&
      !this.isComponentRefNull()
    ) {
      this.handleHoverOutside(event);
    }
  }

  onScroll(event: Event): void {
    const targetElement = event.target;
    if (
      !this.ionPopoverStopCloseOnScroll() &&
      targetElement instanceof HTMLElement &&
      !targetElement.closest('ion-popover')
    ) {
      this.destroyComponent();
    }
  }

  handleHoverOutside(event: MouseEvent): void {
    if (!this.popoverComponentRef) return;

    const popoverElement = this.popoverComponentRef.location.nativeElement;
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    const isInsidePopoverOrHost =
      popoverElement.contains(event.relatedTarget as Node) ||
      hostElement.contains(event.relatedTarget as Node);

    if (!isInsidePopoverOrHost) {
      this.destroyComponent();
    }
  }

  handlePopoverTrigger(trigger: PopoverTrigger): void {
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    if (this.isPopoverTrigger(trigger) && this.elementIsEnabled(hostElement)) {
      this.open();
    }
  }

  destroyComponent(): void {
    if (!this.isComponentRefNull()) {
      this.appRef.detachView(this.popoverComponentRef!.hostView);
      this.popoverComponentRef!.destroy();
      this.popoverComponentRef = null;
    }
  }

  isPopoverTrigger(trigger: PopoverTrigger): boolean {
    return this.ionPopoverTrigger() === trigger;
  }

  isComponentRefNull(): boolean {
    return this.popoverComponentRef === null;
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
