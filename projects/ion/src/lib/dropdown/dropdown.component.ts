import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConnectedPosition,
  Overlay,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { IonIconComponent } from '../icon/icon.component';
import { IonSpinnerComponent } from '../spinner/spinner.component';
import { IonNoDataComponent } from '../no-data/no-data.component';

export const COLDOWN = 200;

@Component({
  selector: 'ion-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    IonIconComponent,
    IonSpinnerComponent,
    IonNoDataComponent,
    OverlayModule,
    PortalModule,
  ],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonDropdownComponent implements AfterViewInit, OnDestroy {
  // Inputs
  origin = input<HTMLElement | ElementRef>();
  description = input<DropdownParams['description']>();
  options = input<DropdownItem[]>([]);
  maxSelected = input<DropdownParams['maxSelected']>();
  multiple = input<boolean>(false);
  required = input<boolean>(false);
  loading = input<boolean>(false);
  enableSearch = input<boolean>(false);
  searchOptions = input<DropdownParams['searchOptions']>();
  notShowClearButton = input<boolean>(false);
  closeOnClickOutside = input<boolean>(true);
  noDataConfig = input<DropdownParams['noDataConfig']>({
    label: 'Não há dados',
    iconType: 'exclamation-rounded',
  });
  propLabel = input<DropdownParams['propLabel']>('label');

  // Outputs
  selected = output<DropdownItem[]>();
  searchChange = output<string>();
  clearBadgeValue = output<void>();
  scrollFinal = output<void>();
  closeDropdown = output<DropdownItem[]>();
  clearButton = output<void>();

  // ViewChild
  optionList = viewChild<ElementRef>('optionList');
  searchInput = viewChild<ElementRef>('searchInput');
  dropdownContent = viewChild<TemplateRef<any>>('dropdownContent');

  // Signals
  iconSize = signal(16);
  clearButtonIsVisible = signal(false);
  dropdownSelectedItems = signal<DropdownItem[]>([]);
  canDeselect = signal(true);
  searchValue = signal('');

  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  private overlayRef: OverlayRef | null = null;

  constructor() {
    // Update clear button visibility when relevant inputs change
    effect(() => {
      const hasItemsSelected = this.dropdownSelectedItems().length > 0;
      const showClearButton = !this.notShowClearButton();

      this.clearButtonIsVisible.set(
        hasItemsSelected &&
          this.multiple() &&
          showClearButton &&
          !this.required() &&
          !this.loading()
      );
    });

    // Update canDeselect when selection changes
    effect(() => {
      const isSingleSelectionAllowed = !this.multiple() && !this.required();
      const isMultipleSelectionAllowed =
        this.multiple() &&
        (!this.required() ||
          (this.required() && this.dropdownSelectedItems().length > 1));

      this.canDeselect.set(
        isSingleSelectionAllowed || isMultipleSelectionAllowed
      );
    });

    // Initialize selected items when options change
    effect(() => {
      const opts = this.options();
      if (opts && opts.length > 0) {
        const selectedItems = opts.filter((option) => option.selected);
        this.dropdownSelectedItems.set(selectedItems);
      }
    });

    // Focus search input when it appears
    effect(() => {
      const input = this.searchInput();
      if (input && this.enableSearch()) {
        input.nativeElement.focus();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.origin()) {
      this.createOverlay();
    }
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }

  private createOverlay(): void {
    const originElement = this.getOriginElement();
    if (!originElement) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(originElement)
      .withPositions(this.getPositions())
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });

    const template = this.dropdownContent();
    if (template) {
      const portal = new TemplatePortal(template, this.viewContainerRef);
      this.overlayRef.attach(portal);
    }
  }

  private getOriginElement(): HTMLElement | null {
    const origin = this.origin();
    if (!origin) return null;
    return origin instanceof ElementRef ? origin.nativeElement : origin;
  }

  private getPositions(): ConnectedPosition[] {
    return [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 4,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -4,
      },
    ];
  }

  private disposeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  mouseEnter(option: DropdownItem): void {
    if (option.selected && !option.disabled) {
      option.hovered = true;
    }
  }

  mouseLeave(option: DropdownItem): void {
    if (option.selected && !option.disabled) {
      option.hovered = false;
    }
  }

  clearEvent(): void {
    this.clearOptions();
    if (!this.multiple() && !this.required()) {
      this.selected.emit(this.dropdownSelectedItems());
    }
  }

  clearOptions(isClearButton = false): void {
    this.options().forEach((item: DropdownItem) => {
      item.selected = false;
    });
    this.dropdownSelectedItems.set([]);
    if (isClearButton) {
      this.selected.emit([]);
      this.clearButton.emit();
    }
  }

  optionsScroll(): void {
    const scrollableElement = this.optionList()?.nativeElement;
    if (!scrollableElement) return;

    const scrollFinalReached =
      scrollableElement.scrollHeight - scrollableElement.scrollTop ===
      scrollableElement.clientHeight;

    if (scrollFinalReached) {
      this.scrollFinal.emit();
    }
  }

  select(option: DropdownItem): void {
    if (option.disabled) {
      return;
    }

    if (this.multiple()) {
      this.manageMultipleOptions(option);
      return;
    }

    if (!option.selected) {
      this.selectSingleOption(option);
      return;
    }

    if (!this.required()) {
      this.clearEvent();
    }
  }

  selectSingleOption(option: DropdownItem): void {
    this.options().forEach((item: DropdownItem) => {
      item.selected = false;
    });
    option.selected = true;
    this.updateSelectedItems();
  }

  manageMultipleOptions(option: DropdownItem): void {
    if (!option.selected && this.isAtSelectedsMaxLength()) {
      return;
    }

    if (!option.selected || (option.selected && this.canDeselect())) {
      option.selected = !option.selected;
    }

    if (this.dropdownSelectedItems().length === 0) {
      this.clearBadgeValue.emit();
    }
    this.updateSelectedItems();
  }

  isAtSelectedsMaxLength(): boolean {
    const selectedOptions = this.options().filter((option) => option.selected);
    const max = this.maxSelected();
    return max !== undefined && selectedOptions.length === max;
  }

  inputChange(value: string): void {
    this.searchValue.set(value);
    this.searchChange.emit(value);
  }

  updateSelectedItems(): void {
    const opts = this.options();
    const selectedItems =
      opts && opts.length > 0 ? opts.filter((option) => option.selected) : [];

    this.dropdownSelectedItems.set(selectedItems);
    this.selected.emit(selectedItems);
  }

  clickedOutsideDropdown(): void {
    this.closeDropdown.emit(this.dropdownSelectedItems());
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.closeOnClickOutside()) {
      return;
    }

    const target = event.target as Node;
    const dropdownElement = this.elementRef.nativeElement as HTMLElement;
    const overlayElement = this.overlayRef?.overlayElement;
    const originElement = this.getOriginElement();

    if (
      !dropdownElement.contains(target) &&
      !overlayElement?.contains(target) &&
      !originElement?.contains(target)
    ) {
      this.clickedOutsideDropdown();
    }
  }
}
