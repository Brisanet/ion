import { Component, Input } from '@angular/core';
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
        [ionPopoverTitle]="ionPopoverTitle"
        [ionPopoverBody]="ionPopoverBody"
        [ionPopoverIconClose]="ionPopoverIconClose"
        [ionPopoverPosition]="ionPopoverPosition"
        [ionPopoverActions]="ionPopoverActions"
        label="click me"
      >
      </ion-button>
    </div>
  `,
})
export class OpenPopoverComponent {
  @Input() ionPopoverTitle = 'Eu sou um popover';
  @Input() ionPopoverBody = 'e eu sou o body do popover';
  @Input() ionPopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverIconClose = true;
  @Input() ionPopoverActions = [{ label: 'actions 1' }, { label: 'action 2' }];
}
