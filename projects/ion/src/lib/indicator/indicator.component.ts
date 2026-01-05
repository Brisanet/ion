import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
  IonModalResponse,
  IonIconProps,
  PopoverPosition,
  TooltipPosition,
  TooltipTrigger,
} from '../core/types';
import { IonModalService } from '../modal/modal.service';
import { IonIconComponent } from '../icon/icon.component';
import { IonButtonComponent } from '../button/button.component';
import { IonSkeletonComponent } from '../skeleton/skeleton.component';
import { IonNoDataComponent } from '../no-data/no-data.component';
import { IonSpinnerComponent } from '../spinner/spinner.component';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import { IonPopoverDirective } from '../popover/popover.directive';

@Component({
  selector: 'ion-indicator',
  standalone: true,
  imports: [
    IonIconComponent,
    IonButtonComponent,
    IonSkeletonComponent,
    IonNoDataComponent,
    IonSpinnerComponent,
    IonTooltipDirective,
    IonPopoverDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonIndicatorComponent {
  private sanitizer = inject(DomSanitizer);
  private ionModalService = inject(IonModalService);
  protected PopoverPosition = PopoverPosition;
  protected TooltipPosition = TooltipPosition;
  protected TooltipTrigger = TooltipTrigger;

  title = input<string>('Ion Indicator');
  headerIcon = input<Pick<IonIconProps, 'type' | 'color'>>();
  tooltipText = input<string>();
  secondValueTooltipText = input<string>();
  value = input<number | string>();
  secondValue = input<number | string>();
  buttonConfig = input<IonIndicatorButtonConfiguration>();
  preview = input(false);
  loading = input(false);
  error = input(false);
  fullWidth = input(false);

  ionClick = output<void>();
  modalEvent = output<IonModalResponse | unknown>();

  private buttonActions = {
    emitter: this.emitButtonClick.bind(this),
    modal: this.openModal.bind(this),
    redirect: this.redirectTo.bind(this),
    popover: this.handlePopoverClick.bind(this),
  };

  handleButtonClick(type: string): void {
    const action = this.buttonActions[type as keyof typeof this.buttonActions];
    if (action) {
      action();
    }
  }

  private handlePopoverClick(): void {
    // Popover is handled by directive in template
  }

  private sanitizeUrl(): SafeResourceUrl {
    const config = this.buttonConfig();
    if (
      config &&
      config.type === IonIndicatorButtonType.Redirect &&
      config.redirectLink
    ) {
      return (
        this.sanitizer.sanitize(SecurityContext.URL, config.redirectLink) || ''
      );
    }
    return '';
  }

  private emitButtonClick(): void {
    this.ionClick.emit();
  }

  private redirectTo(): void {
    const safeUrl = this.sanitizeUrl();
    if (safeUrl) {
      window.open(safeUrl as string, '_blank');
    }
  }

  private openModal(): void {
    const config = this.buttonConfig();
    if (config && config.componentToModal) {
      this.ionModalService
        .open(config.componentToModal, config.modalConfig)
        .subscribe((responseFromModal) => {
          this.modalEvent.emit(responseFromModal);
        });
    }
  }
}
