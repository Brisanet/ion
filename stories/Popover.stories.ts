import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonAlertComponent } from '../projects/ion/src/lib/alert/alert.component';
import { IonDividerComponent } from '../projects/ion/src/lib/divider/divider.component';
import { IonPopoverComponent } from '../projects/ion/src/lib/popover/component/popover.component';
import { IonPopoverDirective } from '../projects/ion/src/lib/popover/popover.directive';
import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import {
  IonSharedModule,
  IonTooltipModule,
} from '../projects/ion/src/public-api';

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
        label="click me"
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
  ionPopoverPosition: PopoverPosition.DEFAULT,
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

export default {
  title: 'Ion/Data Display/Popover',
  decorators: [
    moduleMetadata({
      declarations: [
        IonPopoverComponent,
        IonAlertComponent,
        IonDividerComponent,
        IonPopoverDirective,
      ],
      imports: [CommonModule, IonSharedModule, IonTooltipModule],
      entryComponents: [IonPopoverComponent, IonTooltipComponent],
    }),
  ],
} as Meta;
