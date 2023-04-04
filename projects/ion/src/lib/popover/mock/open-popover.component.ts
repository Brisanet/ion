import { Component } from '@angular/core';
import { PopoverPosition } from '../../core/types/popover';

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
        [isVisible]="args.isVisible"
        [onClickDesable]="args.onClickDesable"
        label="click me"
      >
      </ion-button>
      <ng-template #BodyTemplate> {{ args.ionPopoverBody }} </ng-template>
    </div>

    <ion-button (click)="changeVisibility()" label="change visibility">
    </ion-button>
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
    isVisible: false,
    onClickDesable: true,
  };

  changeVisibility(): void {
    this.args.isVisible = !this.args.isVisible;
  }
}
