import {
  Directive,
  Input,
  HostListener,
  ComponentFactoryResolver,
  Injector,
  Inject,
  ComponentRef,
  ApplicationRef,
  Output,
  EventEmitter,
  ViewContainerRef,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { PopoverPosition } from '../core/types/popover';
import { getPositionsPopover } from './utilsPopover';
import { IonButtonProps, IconType } from '../core/types';

@Directive({ selector: '[ionPopover]' })
export class IonPopoverDirective implements OnDestroy {
  @Input() ionPopoverTitle: string;
  @Input() ionPopoverBody: TemplateRef<void>;
  @Input() ionPopoverActions?: IonButtonProps[];
  @Input() ionPopoverIcon?: IconType;
  @Input() ionPopoverIconClose? = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverArrowPointAtCenter = true;
  @Output() ionOnFirstAction = new EventEmitter<void>();
  @Output() ionOnSecondAction = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popoverComponentRef!: ComponentRef<IonPopoverComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(position: SafeAny): void {
    if (this.popoverComponentRef) {
      return;
    }
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(IonPopoverComponent)
      .create(this.injector);

    this.popoverComponentRef = popover;

    this.appRef.attachView(this.popoverComponentRef.hostView);

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);
    this.popoverComponentRef.changeDetectorRef.detectChanges();

    this.popoverComponentRef.instance.ionPopoverTitle = this.ionPopoverTitle;

    this.popoverComponentRef.instance.ionPopoverBody = this.ionPopoverBody;

    this.popoverComponentRef.instance.ionPopoverActions =
      this.ionPopoverActions;

    this.popoverComponentRef.instance.ionPopoverIcon = this.ionPopoverIcon;

    this.popoverComponentRef.instance.ionPopoverIconClose =
      this.ionPopoverIconClose;

    this.popoverComponentRef.instance.ionPopoverPosition =
      this.ionPopoverPosition;

    this.popoverComponentRef.instance.ionOnFirstAction.subscribe(() => {
      this.closePopover();
      this.ionOnFirstAction.emit();
    });

    this.popoverComponentRef.instance.ionOnSecondAction.subscribe(() => {
      this.closePopover();
      this.ionOnSecondAction.emit();
    });

    this.popoverComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopover();
      this.ionOnClose.emit();
    });

    this.setComponentPosition(position);
    this.popoverComponentRef.changeDetectorRef.detectChanges();

    document.addEventListener('click', (e) => this.onDocumentClick(e));
  }

  setComponentPosition(hostElement: SafeAny): void {
    const { left, right, top, bottom } = hostElement;
    const hostPositions = { left, right, top, bottom };
    const positions = getPositionsPopover(
      hostPositions,
      this.ionPopoverArrowPointAtCenter
    );

    this.popoverComponentRef.instance.left =
      positions[this.ionPopoverPosition].left;
    this.popoverComponentRef.instance.top =
      positions[this.ionPopoverPosition].top;
    this.popoverComponentRef.instance.position = 'absolute';
  }

  closePopover(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  elementIsEnabled(element: HTMLElement): boolean {
    return (
      !element.getAttribute('ng-reflect-disabled') ||
      (element.getAttribute('ng-reflect-disabled') &&
        element.getAttribute('ng-reflect-disabled') == 'false')
    );
  }

  @HostListener('click') onClick(): void {
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    const position = hostElement.getBoundingClientRect();

    if (this.elementIsEnabled(hostElement)) {
      this.open(position);
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (this.popoverComponentRef) {
      const popoverElement = this.popoverComponentRef.location
        .nativeElement as HTMLElement;
      const hostElement = this.viewRef.element.nativeElement as HTMLElement;

      if (
        !popoverElement.contains(event.target as SafeAny) &&
        !hostElement.contains(event.target as SafeAny)
      ) {
        this.closePopover();
      }
    }
  }

  destroyComponent(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick);
    this.destroyComponent();
  }
}
