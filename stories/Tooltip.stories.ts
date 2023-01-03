import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  TooltipPosition,
  TooltipTrigger,
} from '../projects/ion/src/lib/core/types';
import {
  TooltipComponent,
  TooltipProps,
} from '../projects/ion/src/lib/tooltip/tooltip.component';
import { TooltipDirective } from '../projects/ion/src/lib/tooltip/tooltip.directive';

export default {
  title: 'Ion/Data Display/Tooltip',
  decorators: [
    moduleMetadata({
      declarations: [TooltipDirective, TooltipComponent],
      imports: [CommonModule],
      entryComponents: [TooltipComponent],
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
