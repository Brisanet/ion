import { Component } from '@angular/core';
import { PopoverPosition } from '../../core/types/popover';

@Component({
  template: `
    <style>
      div {
        margin-left: 10px;
        display: flex;
      }
    </style>
    <div>
      <ion-popover
        [ionPopoverTitle]="args.ionPopoverTitle"
        [ionPopoverBody]="BodyTemplate"
        [ionPopoverIconClose]="args.ionPopoverIconClose"
        [ionPopoverPosition]="args.ionPopoverPosition"
        [ionPopoverActions]="args.ionPopoverActions"
      >
      </ion-popover>
      <ng-template #BodyTemplate> {{ args.ionPopoverBody }} </ng-template>
    </div>
  `,
})
export class bodyMockComponent {
  args = {
    ionPopoverTitle: 'Você tem certeza?',
    ionPopoverBody:
      'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
    ionPopoverPosition: PopoverPosition.DEFAULT,
    ionPopoverIconClose: true,
    ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
  };
}
