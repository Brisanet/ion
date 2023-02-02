import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export enum IonIndicatorButtonType {
  Redirect = 'redirect',
  Popover = 'popover',
  Modal = 'modal',
  Emitter = 'emitter',
}

export interface IonIndicatorButtonConfig {
  label: string;
  type: IonIndicatorButtonType;
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

  emitButtonClick(): void {
    this.ionClick.emit();
  }
}
