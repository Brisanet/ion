import {
  Component,
  EventEmitter,
  Input,
  Output,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export enum IonIndicatorButtonType {
  Redirect = 'redirect',
  Popover = 'popover',
  Modal = 'modal',
  Emitter = 'emitter',
}

export interface IonIndicatorButtonConfig {
  label: string;
  type: IonIndicatorButtonType;
  /**
   * @Link
   * Para funcionar corretamente, o link informado deve ser em protocolo HTTPS.
   */
  redirectLink?: string;
  popoverMessage?: string;
  componentToModal?: unknown;
}

@Component({
  selector: 'ion-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IonIndicatorComponent {
  @Input() title = 'Título do Indicador';
  @Input() tooltipText?: string;
  @Input() value?: number | string;
  @Input() secondValue?: number | string;
  @Input() buttonConfig?: IonIndicatorButtonConfig;
  @Output() ionClick = new EventEmitter();
  private safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  emitButtonClick(): void {
    this.ionClick.emit();
  }

  redirectTo(): void {
    this.safeUrl = this.sanitizeUrl();
    window.open(this.safeUrl as string, '_blank');
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
