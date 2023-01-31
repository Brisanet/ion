import { Component, Input, Output, Type, EventEmitter } from '@angular/core';

export type IonIndicatorButtonType =
  | 'redirect'
  | 'popover'
  | 'modal'
  | 'emitter';
export interface IonIndicatorButtonConfig {
  label: string;
  redirectLink?: string;
  popoverMessage?: string;
  type: IonIndicatorButtonType;
  componentToModal?: Type<unknown>;
}

@Component({
  selector: 'ion-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IonIndicatorComponent {
  // TODO: pensar melhor em como aplicar as configurações de botão, popover, redirect e modal
  @Input() title = 'Titulo do indicator';
  @Input() tooltipText: string;
  @Input() value: number | string | undefined;
  @Input() secondValue: number | string | undefined;
  @Input() buttonConfig: undefined | IonIndicatorButtonConfig;
  @Output() ionClick = new EventEmitter<boolean>();

  ionButtonClicked(): void {
    this.ionClick.emit(true);
  }
}
