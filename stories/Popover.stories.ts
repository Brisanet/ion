import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  IonPopoverComponent,
  PopoverProps,
} from '../projects/ion/src/lib/popover/popover.component';
import {
  AlertComponent,
  IonDividerComponent,
  PopoverDirective,
} from '../projects/ion/src/public-api';
import { PopoverPosition } from '../projects/ion/src/lib/core/types/popover';
import { ButtonModule } from './../projects/ion/src/lib/button/button.module';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';

const TemplateComponente: Story<IonPopoverComponent> = (
  args: IonPopoverComponent
) => ({
  component: IonPopoverComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonDividerComponent, AlertComponent],
    imports: [CommonModule, ButtonModule],
  },
});

export const DefaultComponent = TemplateComponente.bind({});
DefaultComponent.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIconClose: true,
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverActions: null,
};

export const withActions = TemplateComponente.bind({});
withActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'condominium',
  ionPopoverIconClose: true,
  ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
  ionPopoverPosition: PopoverPosition.DEFAULT,
};

export default {
  title: 'Ion/Data Display/Popover',
  decorators: [
    moduleMetadata({
      declarations: [
        PopoverDirective,
        IonPopoverComponent,
        AlertComponent,
        IonDividerComponent,
      ],
      imports: [CommonModule, ButtonModule],
      entryComponents: [IonPopoverComponent],
    }),
  ],
  argTypes: {
    ionPopoverTitle: {
      name: 'ionPopoverTitle',
      type: { name: 'string' },
      defaultValue: '',
    },
    ionPopoverBody: {
      name: 'ionPopoverBody',
      type: { name: 'string' },
      defaultValue: '',
    },
    ionPopoverActions: {
      control: 'array',
      defaultValue: [],
    },
    ionPopoverIconClose: {
      name: 'ionPopoverIconClose',
      control: 'boolean',
      defaultValue: true,
    },
    ionPopoverPosition: {
      name: 'ionPopoverPosition',
      control: 'select',
      options: [...Object.values(PopoverPosition)],
    },
    ionPopoverArrowPointAtCenter: {
      name: 'ionPopoverArrowPointAtCenter',
      control: 'boolean',
      defaultValue: true,
    },
  },
} as Meta;

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
        ionPopoverBody="${args.ionPopoverBody}"
        ionPopoverIconClose="${args.ionPopoverIconClose}"
        ionPopoverPosition="${args.ionPopoverPosition}"
        ionPopoverActions="${args.ionPopoverActions}"
        label="click me"
      >
      </ion-button>
    </div>
  `,
});

const actions = [{ label: 'actions 1' }, { label: 'action 2' }];

export const Default = Template.bind({});
Default.args = {
  ionPopoverTitle: 'Eu sou um popover',
  ionPopoverBody: 'e eu sou o body do popover',
  ionPopoverPosition: PopoverPosition.TOP_LEFT,
  ionPopoverIconClose: false,
  ionPopoverActions: actions,
} as PopoverProps;
Default.storyName = 'ionPopover';
