import { Component } from '@angular/core';

import { PopoverPosition, PopoverTrigger } from '../../core/types/popover';

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
        [ionPopoverTrigger]="args.ionPopoverTrigger"
        label="click me"
      >
      </ion-button>
      <ng-template #BodyTemplate> {{ args.ionPopoverBody }} </ng-template>
    </div>
  `,
})
export class OpenPopoverComponent {
  args = {
    ionPopoverTitle: 'Você tem certeza?',
    ionPopoverBody:
      'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
    ionPopoverPosition: PopoverPosition.DEFAULT,
    ionPopoverIconClose: true,
    ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
  };
}
