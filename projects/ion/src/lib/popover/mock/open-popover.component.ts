import { Component } from '@angular/core';
import { PopoverPosition } from '../../core/types/popover';

@Component({
  template: `
    <style>
      div {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        ionPopover
        [ionPopoverTitle]="args.ionPopoverTitle"
        [ionPopoverBody]="args.ionPopoverBody"
        [ionPopoverIconClose]="args.ionPopoverIconClose"
        [ionPopoverPosition]="args.ionPopoverPosition"
        [ionPopoverActions]="args.ionPopoverActions"
        label="click me"
      >
      </ion-button>
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
    ionPopoverActions: [{ label: 'actions 1' }, { label: 'action 2' }],
  };
}
