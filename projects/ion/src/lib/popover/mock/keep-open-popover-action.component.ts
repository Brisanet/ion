import { Component } from '@angular/core';

import { PopoverPosition } from '../../core/types/popover';
import { popoverStyleForStorybook } from './open-popover.component';

@Component({
  template: `
    <style>
      div {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        ionPopover
        [ionPopoverTitle]="args.ionPopoverTitle"
        [ionPopoverBody]="BodyTemplate"
        [ionPopoverIconClose]="args.ionPopoverIconClose"
        [ionPopoverPosition]="args.ionPopoverPosition"
        [ionPopoverActions]="args.ionPopoverActions"
        label="click me"
      >
      </ion-button>
      <ng-template #BodyTemplate> {{ args.ionPopoverBody }} </ng-template>
    </div>
  `,
  styles: [popoverStyleForStorybook],
})
export class KeepOpenPopoverActionComponent {
  args = {
    ionPopoverTitle: 'Desafio na Jornada',
    ionPopoverBody:
      'Você pode escolher avançar corajosamente para a próxima etapa da jornada ou optar por explorar o caminho anterior.',
    ionPopoverPosition: PopoverPosition.DEFAULT,
    ionPopoverIconClose: true,
    ionPopoverActions: [
      { label: 'voltar', keepOpenAfterAction: true },
      { label: 'continuar', keepOpenAfterAction: true },
    ],
  };
}
