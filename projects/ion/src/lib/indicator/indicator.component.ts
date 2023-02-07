import {
  Component,
  EventEmitter,
  Input,
  Output,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonModalResponse } from '../modal/models/modal.interface';
import { IonModalService } from './../modal/modal.service';
import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
} from '../core/types/indicator';

@Component({
  selector: 'ion-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IonIndicatorComponent {
  @Input() title = 'Ion Indicator';
  @Input() tooltipText: string;
  @Input() value: number | string;
  @Input() secondValue: number | string;
  @Input() buttonConfig: IonIndicatorButtonConfiguration;
  @Output() ionClick = new EventEmitter();
  @Output() modalEvent = new EventEmitter<IonModalResponse | unknown>();
  safeUrl: SafeResourceUrl;
  private buttonActions = {
    emitter: this.emitButtonClick,
    modal: this.openModal,
    redirect: this.redirectTo,
  };

  constructor(
    private sanitizer: DomSanitizer,
    private ionModalService: IonModalService
  ) {}

  handleButtonClick(type: string): void {
    const action = this.buttonActions[type];
    action && action.bind(this)();
  }

  private sanitizeUrl(): SafeResourceUrl {
    if (
      this.buttonConfig.type === IonIndicatorButtonType.Redirect &&
      this.buttonConfig.redirectLink
    ) {
      return this.sanitizer.sanitize(
        SecurityContext.URL,
        this.buttonConfig.redirectLink
      );
    }
  }

  private emitButtonClick(): void {
    this.ionClick.emit();
  }

  private redirectTo(): void {
    this.safeUrl = this.sanitizeUrl();
    window.open(this.safeUrl as string, '_blank');
  }

  private openModal(): void {
    this.ionModalService
      .open(this.buttonConfig.componentToModal, this.buttonConfig.modalConfig)
      .subscribe((responseFromModal) => {
        this.modalEvent.emit(responseFromModal);
      });
  }
}
