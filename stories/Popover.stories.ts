import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  IonPopoverComponent,
  PopoverProps,
} from '../projects/ion/src/lib/popover/component/popover.component';
import { IonSharedModule } from '../projects/ion/src/public-api';
import { IonDividerComponent } from '../projects/ion/src/lib/divider/divider.component';
import { IonAlertComponent } from '../projects/ion/src/lib/alert/alert.component';
import { moduleMetadata } from '@storybook/angular';
import { PopoverPosition } from '../projects/ion/src/lib/core/types/popover';
import { IonPopoverDirective } from '../projects/ion/src/lib/popover/popover.directive';

const TemplateComponente: Story<IonPopoverComponent> = (
  args: IonPopoverComponent
) => ({
  component: IonPopoverComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [IonDividerComponent],
    imports: [CommonModule, IonSharedModule],
  },
});

export const Component = TemplateComponente.bind({});
Component.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIconClose: true,
  ionPopoverActions: null,
};
Component.parameters = {
  controls: { exclude: /^ionPopoverPosition*/ },
};

export const ComponentWithActions = TemplateComponente.bind({});
ComponentWithActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'condominium',
  ionPopoverIconClose: true,
  ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
};
ComponentWithActions.parameters = {
  controls: { exclude: /^ionPopoverPosition*/ },
};

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
      imports: [CommonModule, IonSharedModule],
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
        [ionPopoverActions]="null"
        label="click me"
      >
      </ion-button>
    </div>
  `,
});

export const Directive = Template.bind({});
Directive.args = {
  ionPopoverTitle: 'Eu sou um popover',
  ionPopoverBody: 'e eu sou o body do popover',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: false,
} as PopoverProps;
