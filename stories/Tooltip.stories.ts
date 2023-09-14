import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  TooltipPosition,
  TooltipTrigger,
  TooltipProps,
} from '../projects/ion/src/lib/core/types';
import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import { IonTooltipDirective } from '../projects/ion/src/lib/tooltip/tooltip.directive';
import { IonIconModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Tooltip',
  decorators: [
    moduleMetadata({
      declarations: [IonTooltipDirective, IonTooltipComponent],
      imports: [CommonModule, IonIconModule],
      entryComponents: [IonTooltipComponent],
    }),
  ],
  argTypes: {
    ionTooltipTitle: {
      name: 'ionTooltipTitle',
      type: { name: 'string' },
      defaultValue: '',
    },
    ionTooltipColorScheme: {
      name: 'ionTooltipColorScheme',
      control: 'radio',
      options: ['light', 'dark'],
      defaultValue: 'dark',
    },
    ionTooltipPosition: {
      name: 'ionTooltipPosition',
      control: 'select',
      options: [...Object.values(TooltipPosition)],
    },
    ionTooltipTrigger: {
      name: 'ionTooltipTrigger',
      control: 'radio',
      options: [...Object.values(TooltipTrigger)],
    },
    ionTooltipShowDelay: {
      name: 'ionTooltipShowDelay',
      control: 'number',
      defaultValue: 0,
    },
    ionTooltipArrowPointAtCenter: {
      name: 'ionTooltipArrowPointAtCenter',
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
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <div>
      <span
        ionTooltip
        ionTooltipTitle="${args.ionTooltipTitle}"
        ionTooltipPosition="${args.ionTooltipPosition}"
        [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
        ionTooltipColorScheme="${args.ionTooltipColorScheme}"
        ionTooltipTrigger="${args.ionTooltipTrigger}"
        ionTooltipShowDelay="${args.ionTooltipShowDelay}"
      >
        Hover me
      </span>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  ionTooltipTitle: 'Eu sou um tooltip',
  ionTooltipPosition: TooltipPosition.DEFAULT,
  ionTooltipTrigger: TooltipTrigger.DEFAULT,
} as TooltipProps;
Default.storyName = 'Tooltip';

const WithTemplateRef: Story = (args) => ({
  props: args,
  template: `
    <style>
        .tooltip {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            color: white;
        }
    </style>
    <div class="tooltip">
      <span
        ionTooltip
        ionTooltipTitle="${args.ionTooltipTitle}"
        [ionTooltipTemplateRef]="titleTemplate"
        ionTooltipPosition="${args.ionTooltipPosition}"
        [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
        ionTooltipColorScheme="${args.ionTooltipColorScheme}"
        ionTooltipTrigger="${args.ionTooltipTrigger}"
        ionTooltipShowDelay="${args.ionTooltipShowDelay}"
      >
        Hover me
      </span>
      <ng-template #titleTemplate>
        <div class="content">
          <ion-icon type="check-outlined" color="#FCFCFD"></ion-icon>
          <span>Verificado!</span>
        </div>
      </ng-template>
    </div>
  `,
});

export const WithContent = WithTemplateRef.bind({});
WithContent.args = {
  ionTooltipTitle: '',
  ionTooltipPosition: TooltipPosition.BOTTOM_CENTER,
  ionTooltipTrigger: TooltipTrigger.DEFAULT,
} as TooltipProps;
WithContent.storyName = 'With Content';

const WithTitleAndTemplateRef: Story = (args) => ({
  props: args,
  template: `
    <style>
        .tooltip {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
            color: white;
            margin-top: 8px;
            font-size: 12px;
        }
    </style>
    <div class="tooltip">
      <span
        ionTooltip
        ionTooltipTitle="${args.ionTooltipTitle}"
        [ionTooltipTemplateRef]="titleTemplate"
        ionTooltipPosition="${args.ionTooltipPosition}"
        [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
        ionTooltipColorScheme="${args.ionTooltipColorScheme}"
        ionTooltipTrigger="${args.ionTooltipTrigger}"
        ionTooltipShowDelay="${args.ionTooltipShowDelay}"
      >
        Hover me
      </span>
      <ng-template #titleTemplate>
        <div class="content">
          <ion-icon type="wait" size="16" color="#FCFCFD"></ion-icon>
          <span>Atualizado em 18/04/2022 às 16:34</span>
        </div>
      </ng-template>
    </div>
  `,
});

export const WithTitleAndSubtitle = WithTitleAndTemplateRef.bind({});
WithTitleAndSubtitle.args = {
  ionTooltipTitle: 'Explicação do indicador aqui',
  ionTooltipPosition: TooltipPosition.DEFAULT,
  ionTooltipTrigger: TooltipTrigger.DEFAULT,
} as TooltipProps;
WithTitleAndSubtitle.storyName = 'With Title and Content';

const TemplateWithEdgeHost: Story = (args) => ({
  props: args,
  template: `
    <style>
        main {
            height: 100vh;
            padding: 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        .row {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
    </style>
    <main>
    <div class="row">
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    </div>
    <div class="row">
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    </div>
    <div class="row">
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    </div>
    </main>
  `,
});

export const WithHostOnEdge = TemplateWithEdgeHost.bind({});
WithHostOnEdge.args = {
  ionTooltipTitle:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  ionTooltipPosition: TooltipPosition.DEFAULT,
  ionTooltipTrigger: TooltipTrigger.DEFAULT,
} as TooltipProps;
