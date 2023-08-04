import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonPopoverComponent } from '../projects/ion/src/lib/popover/component/popover.component';
import { IonSharedModule } from '../projects/ion/src/public-api';
import { IonDividerComponent } from '../projects/ion/src/lib/divider/divider.component';
import { IonAlertComponent } from '../projects/ion/src/lib/alert/alert.component';
import { moduleMetadata } from '@storybook/angular';
import {
  PopoverPosition,
  PopoverProps,
} from '../projects/ion/src/lib/core/types/popover';
import { IonPopoverDirective } from '../projects/ion/src/lib/popover/popover.directive';
import { bodyMockComponent } from '../projects/ion/src/lib/popover/mock/body-mock.component';
import { IonTooltipModule } from './../projects/ion/src/lib/tooltip/tooltip.module';
import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';

const TemplateComponente: Story = (args) => ({
  props: args,
  template: `
    <style>
          div {
            display: flex;
            margin-left: 10px;
          }
    </style>
    <div>
      <ion-popover
        ionPopoverTitle="${args.ionPopoverTitle}"
        [ionPopoverBody]="BodyTemplate"
        ionPopoverIconClose="${args.ionPopoverIconClose}"
        ionPopoverIcon="${args.ionPopoverIcon}"
        ionPopoverIconColor="${args.ionPopoverIconColor}"
      >
      </ion-popover>
      <ng-template #BodyTemplate>
        ${args.ionPopoverBody}
      </ng-template>
    </div>
  `,
});

export const Component = TemplateComponente.bind({});
Component.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverBody:
    'Aqui segue algum tipo de conteúdo. Muito bacana, não é verdade?!',
  ionPopoverIconClose: true,
  ionPopoverIcon: 'block',
  ionPopoverIconColor: '#282b33',
};
Component.parameters = { controls: { exclude: /^ionPopoverPosition*/ } };

export const ComponentBodyTemplate = TemplateComponente.bind({});
ComponentBodyTemplate.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverIconClose: true,
  ionPopoverBody: `
      <style>
        div {
          display: flex;
          padding: 8px;
        }
      </style>
      <div>
        Preposição 1
        <ion-icon
          type="information"
          [size]="16"
          ionTooltip
          ionTooltipTitle="ionTooltipTitle"
          ionTooltipPosition="centerLeft"
        >
        </ion-icon>
      </div>
      <ion-divider></ion-divider>
      <div>
        Preposição 2
        <ion-icon
          type="information"
          [size]="16"
          ionTooltip
          ionTooltipTitle="ionTooltipTitle"
          ionTooltipPosition="centerLeft"
        >
        </ion-icon>
      </div>
      <ion-divider></ion-divider>
      <div>
        Preposição 3
        <ion-icon
          type="information"
          [size]="16"
          ionTooltip
          ionTooltipTitle="ionTooltipTitle"
          ionTooltipPosition="centerLeft"
        >
        </ion-icon>
      </div>
      <ion-divider></ion-divider>
    `,
};
ComponentBodyTemplate.parameters = {
  controls: { exclude: /^ionPopoverPosition*/ },
};
const TemplateComponenteWithActions: Story<bodyMockComponent> = (
  args: bodyMockComponent
) => ({
  component: bodyMockComponent,
  props: { ...args },
  moduleMetadata: {
    declarations: [IonDividerComponent],
    imports: [CommonModule, IonSharedModule],
  },
});
export const ComponentWithActions = TemplateComponenteWithActions.bind({});
ComponentWithActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
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
        bodyMockComponent,
      ],
      imports: [CommonModule, IonSharedModule, IonTooltipModule],
      entryComponents: [
        IonPopoverComponent,
        bodyMockComponent,
        IonTooltipComponent,
      ],
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
        [ionPopoverBody]="BodyTemplate"
        ionPopoverIconClose="${args.ionPopoverIconClose}"
        ionPopoverPosition="${args.ionPopoverPosition}"
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

export const Directive = Template.bind({});
Directive.args = {
  ionPopoverTitle: 'Título do popover',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: false,
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
} as PopoverProps;
