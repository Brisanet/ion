import { Story } from '@storybook/angular/types-6-0';

import {
  PopoverPosition,
  PopoverProps,
} from '../projects/ion/src/lib/core/types/popover';

const Template: Story = (args) => ({
  props: args,
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
        ionPopoverTitle="${args.ionPopoverTitle}"
        [ionPopoverBody]="BodyTemplate"
        ionPopoverIconClose="${args.ionPopoverIconClose}"
        ionPopoverPosition="${args.ionPopoverPosition}"
        ionPopoverIcon="${args.ionPopoverIcon}"
        ionPopoverIconColor="${args.ionPopoverIconColor}"
        ionPopoverCustomClass="${args.ionPopoverCustomClass}"
        [ionPopoverArrowPointAtCenter]="true"
        [ionPopoverActions]="null"
        label="-"
      >
      </ion-button>
      <ng-template #BodyTemplate>
        Aqui segue algum tipo de conteúdo. Muito bacana, não é verdade?!
      </ng-template>
    </div>
  `,
});

export const Directive = Template.bind({});
Directive.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverPosition: PopoverPosition.RIGHT_BOTTOM,
  ionPopoverIconClose: false,
  ionPopoverIcon: 'historic',
  ionPopoverIconColor: '#282b33',
  ionPopoverCustomClass: 'popover-custom-class',
} as PopoverProps;

const TemplateOpen: Story = (args) => ({
  props: args,
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
        [ionPopoverKeep]="true"
        ionPopoverTitle="${args.ionPopoverTitle}"
        [ionPopoverBody]="BodyTemplate"
        ionPopoverIconClose="${args.ionPopoverIconClose}"
        ionPopoverPosition="${args.ionPopoverPosition}"
        ionPopoverCustomClass="${args.ionPopoverCustomClass}"
        [ionPopoverActions]="null"
        label="click me"
      >
      </ion-button>
      <ng-template #BodyTemplate>
        Aqui segue algum tipo de conteúdo. Muito bacana, não é verdade?!
      </ng-template>
    </div>
  `,
});

export const KeepOpen = TemplateOpen.bind({});
KeepOpen.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: false,
  ionPopoverCustomClass: 'popover-custom-class',
} as PopoverProps;
