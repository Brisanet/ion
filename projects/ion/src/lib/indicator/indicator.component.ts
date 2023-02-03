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
} from './models/indicator';

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
  private safeUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private ionModalService: IonModalService
  ) {}

  emitButtonClick(): void {
    this.ionClick.emit();
  }

  redirectTo(): void {
    this.safeUrl = this.sanitizeUrl();
    window.open(this.safeUrl as string, '_blank');
  }

  openModal(): void {
    this.ionModalService
      .open(this.buttonConfig.componentToModal, this.buttonConfig.modalConfig)
      .subscribe((responseFromModal) => {
        this.modalEvent.emit(responseFromModal);
      });
  }

  sanitizeUrl(): SafeResourceUrl {
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
}
