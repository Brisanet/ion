import { Component, Input, Type } from '@angular/core';

@Component({
  selector: 'ion-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IonIndicatorComponent {
  // TODO: pensar melhor em como aplicar as configurações de botão, popover, redirect e modal

  @Input() title = 'Título';
  @Input() buttonLabel = 'Ação';
  @Input() value: number | string | undefined;
  @Input() secondValue: number | string | undefined;
  @Input() popoverMessage = '';
  @Input() redirectLink = '';
  @Input() componentToModal: Type<unknown>;
}
