import { Component } from '@angular/core';
import { PopoverPosition } from '../../core/types/popover';

@Component({
  template: `
    <main>
      <div style="margin-left: 50px">
        <ion-button
          label="TL"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.TOP_LEFT}"
        >
        </ion-button>
        <ion-button
          label="TC"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.TOP_CENTER}"
        >
        </ion-button>
        <ion-button
          label="TR"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.TOP_RIGHT}"
        >
        </ion-button>
      </div>
      <div style="width: 50px; float: left; flex-direction: column;">
        <ion-button
          label="LT"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.LEFT_TOP}"
        >
        </ion-button>
        <br />
        <ion-button
          label="LB"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.LEFT_BOTTOM}"
        >
          LB
        </ion-button>
      </div>
      <div style="width: 50px; margin-left: 218px; flex-direction: column;">
        <ion-button
          label="RT"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.RIGHT_TOP}"
        >
        </ion-button>
        <br />
        <ion-button
          label="RB"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.RIGHT_BOTTOM}"
        >
        </ion-button>
      </div>
      <div style="margin-left: 50px; clear: both;">
        <ion-button
          label="BL"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.BOTTOM_LEFT}"
        >
        </ion-button>
        <ion-button
          label="BC"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.BOTTOM_CENTER}"
        >
        </ion-button>
        <ion-button
          label="BR"
          type="secondary"
          ionPopover
          ionPopoverTitle="Popover Title"
          [ionPopoverBody]="contentTemplate"
          ionPopoverPosition="${PopoverPosition.BOTTOM_RIGHT}"
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
      }

      div {
        display: flex;
        gap: 10px;
      }
    `,
  ],
})
export class PopoverPlacementsComponent {}
