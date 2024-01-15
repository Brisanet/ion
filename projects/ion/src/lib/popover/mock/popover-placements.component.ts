import { Component } from '@angular/core';
import { PopoverPosition } from '../../core/types/popover';

interface ButtonConfig {
  label: string;
  position: PopoverPosition;
}

@Component({
  template: `
    <main>
      <div
        *ngFor="let configs of buttonConfigs; let indexed = index"
        class="group-{{ indexed }}"
      >
        <ion-button
          *ngFor="let config of configs"
          [label]="config.label"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          [ionPopoverPosition]="config.position"
          [ionPopoverCustomClass]="indexed === 1 ? 'left-in-storybook' : ''"
        >
        </ion-button>
      </div>
    </main>

    <ng-template #contentTemplate>
      <p>Content</p>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 600px;
        margin-left: 50px;
      }

      div {
        display: flex;
        gap: 10px;
      }

      .group-0 {
        margin-left: 50px;
      }

      .group-1 {
        width: 50px;
        float: left;
        flex-direction: column;
      }

      .group-2 {
        width: 50px;
        margin-left: 218px;
        flex-direction: column;
      }

      .group-3 {
        margin-left: 50px;
        clear: both;
      }

      //correction of a bug that only occurs in the storybook
      ::ng-deep .left-in-storybook {
        margin-left: -12px !important;

        &:before,
        &:after {
          margin-left: 14px !important;
        }
      }
    `,
  ],
})
export class PopoverPlacementsComponent {
  buttonConfigs: ButtonConfig[][] = [
    [
      { label: 'TL', position: PopoverPosition.TOP_LEFT },
      { label: 'TC', position: PopoverPosition.TOP_CENTER },
      { label: 'TR', position: PopoverPosition.TOP_RIGHT },
    ],
    [
      { label: 'LT', position: PopoverPosition.LEFT_TOP },
      { label: 'LC', position: PopoverPosition.LEFT_CENTER },
      { label: 'LB', position: PopoverPosition.LEFT_BOTTOM },
    ],
    [
      { label: 'RT', position: PopoverPosition.RIGHT_TOP },
      { label: 'RC', position: PopoverPosition.RIGHT_CENTER },
      { label: 'RB', position: PopoverPosition.RIGHT_BOTTOM },
    ],
    [
      { label: 'BL', position: PopoverPosition.BOTTOM_LEFT },
      { label: 'BC', position: PopoverPosition.BOTTOM_CENTER },
      { label: 'BR', position: PopoverPosition.BOTTOM_RIGHT },
    ],
  ];
}
