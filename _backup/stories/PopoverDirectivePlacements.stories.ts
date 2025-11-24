import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { iconsPaths } from '../projects/ion/src/lib/icon/svgs/icons';
import { popoverStyleForStorybook } from '../projects/ion/src/lib/popover/mock/open-popover.component';
import {
  IonPopoverModule,
  IonSharedModule,
  PopoverPosition,
  PopoverTrigger,
} from '../projects/ion/src/public-api';

interface ButtonConfig {
  label: string;
  position: PopoverPosition;
}

const TemplateOpen: Story = (args) => ({
  props: args,
  template: `
    <main>
      ${args.buttonConfigs
        .map(
          (configs: ButtonConfig[], indexed: number) => `
            <div class="group-${indexed}">
              ${configs
                .map(
                  (config: ButtonConfig) => `
                    <ion-button
                      label="${config.label}"
                      type="secondary"
                      ionPopover
                      ionPopoverTitle="${args.ionPopoverTitle}"
                      [ionPopoverBody]="contentTemplate"
                      ionPopoverIconClose="${args.ionPopoverIconClose}"
                      ionPopoverIcon="${args.ionPopoverIcon}"
                      ionPopoverIconColor="${args.ionPopoverIconColor}"
                      ionPopoverPosition="${config.position}"
                      ionPopoverTrigger="${args.ionPopoverTrigger}"
                      ionPopoverCustomClass="${args.ionPopoverCustomClass}"
                      ionPopoverArrowPointAtCenter="${args.ionPopoverArrowPointAtCenter}"
                    >
                    </ion-button>
                    `
                )
                .join('')}
            </div>
          `
        )
        .join('')}
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
    `,
    popoverStyleForStorybook,
  ],
});

export const Placements = TemplateOpen.bind({});
Placements.args = {
  ionPopoverTrigger: PopoverTrigger.DEFAULT,
  ionPopoverTitle: 'Título do popover',
  ionPopoverIconClose: false,
  ionPopoverIcon: 'historic',
  ionPopoverIconColor: '#282b33',
  ionPopoverArrowPointAtCenter: true,
  ionPopoverAutoReposition: true,
  ionPopoverCustomClass: 'popover-custom-class',
  buttonConfigs: [
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
  ],
};

export default {
  title: 'Ion/Data Display/Popover',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, IonSharedModule, IonPopoverModule],
    }),
  ],
  argTypes: {
    ionPopoverTitle: {
      name: 'ionPopoverTitle',
      type: { name: 'string' },
      defaultValue: 'Título do popover',
    },
    ionPopoverIconClose: {
      name: 'ionPopoverIconClose',
      type: { name: 'boolean' },
      defaultValue: false,
    },
    ionPopoverIcon: {
      name: 'ionPopoverIcon',
      defaultValue: 'historic',
      control: {
        type: 'select',
        options: [...Object.keys(iconsPaths)],
      },
    },
    ionPopoverTrigger: {
      name: 'ionPopoverTrigger',
      control: 'radio',
      options: [...Object.values(PopoverTrigger)],
    },
    ionPopoverArrowPointAtCenter: {
      name: 'ionPopoverArrowPointAtCenter',
      control: 'boolean',
      defaultValue: true,
    },
    ionPopoverCustomClass: {
      name: 'ionPopoverCustomClass',
      type: { name: 'string' },
      defaultValue: '',
    },
    ionPopoverAutoReposition: {
      name: 'ionPopoverAutoReposition',
      type: { name: 'boolean' },
      defaultValue: true,
    },
  },
} as Meta;
