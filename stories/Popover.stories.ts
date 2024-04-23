import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { IonAlertComponent } from '../projects/ion/src/lib/alert/alert.component';
import {
  PopoverPosition,
  PopoverProps,
  PopoverTrigger,
} from '../projects/ion/src/lib/core/types/popover';
import { IonDividerComponent } from '../projects/ion/src/lib/divider/divider.component';
import { iconsPaths } from '../projects/ion/src/lib/icon/svgs/icons';
import { IonPopoverComponent } from '../projects/ion/src/lib/popover/component/popover.component';
import { popoverStyleForStorybook } from '../projects/ion/src/lib/popover/mock/open-popover.component';
import { IonPopoverDirective } from '../projects/ion/src/lib/popover/popover.directive';
import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import {
  IonSharedModule,
  IonTooltipModule,
} from '../projects/ion/src/public-api';

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
        ionPopoverArrowPointAtCenter="${args.ionPopoverArrowPointAtCenter}"
        ionPopoverTrigger="${args.ionPopoverTrigger}"
        label="${args.ionPopoverTrigger} me"
        ionPopoverCustomClass="${args.ionPopoverCustomClass}"
      >
      </ion-button>
      <ng-template #BodyTemplate>
        <p style="font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; margin-top: -5px;">
          "In the End" é uma música icônica do Linkin Park, lançada em 2001. Combinando rock alternativo e nu-metal, a canção aborda a luta e a inevitabilidade da mudança. A letra reflexiva destaca a importância de esforços, mesmo que os resultados nem sempre sejam como desejado. A fusão de vocais intensos e arranjos emotivos faz de "In the End" uma experiência atemporal, ressoando com milhões de fãs ao redor do mundo.
      </p>
      </ng-template>
    </div>
  `,

  styles: [popoverStyleForStorybook],
});

export const Directive = Template.bind({});
Directive.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: false,
  ionPopoverIcon: 'historic',
  ionPopoverIconColor: '#282b33',
  ionPopoverCustomClass: 'popover-custom-class',
  ionPopoverTrigger: PopoverTrigger.DEFAULT,
  ionPopoverArrowPointAtCenter: true,
};

export const DirectiveWithTriggerHover = Template.bind({});
DirectiveWithTriggerHover.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: false,
  ionPopoverIcon: 'historic',
  ionPopoverIconColor: '#282b33',
  ionPopoverCustomClass: 'popover-custom-class',
  ionPopoverTrigger: PopoverTrigger.HOVER,
  ionPopoverArrowPointAtCenter: true,
};

export const DirectiveWithoutHeader = Template.bind({});
DirectiveWithoutHeader.args = {
  ionPopoverTitle: '',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: false,
  ionPopoverIcon: 'historic',
  ionPopoverIconColor: '#282b33',
  ionPopoverCustomClass: 'popover-custom-class',
  ionPopoverTrigger: PopoverTrigger.DEFAULT,
  ionPopoverArrowPointAtCenter: true,
};

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
  styles: [popoverStyleForStorybook],
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
    ionPopoverPosition: {
      name: 'ionPopoverPosition',
      control: {
        type: 'select',
        options: [...Object.values(PopoverPosition)],
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
  },
} as Meta;
