import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { TooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
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
} as Meta;

const Template: Story<TooltipComponent> = (args: TooltipComponent) => ({
  component: TooltipComponent,
  props: args,
  moduleMetadata: {
    declarations: [TooltipComponent],
    imports: [CommonModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  ionTooltipTitle: 'Eu sou um tooltip.',
  ionTooltipColorScheme: 'dark',
};

export const Button: Story = () => ({
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
        <span ionTooltip ionTooltipTitle="Eu sou um tooltip" ionTooltipPosition="centerRight">Hover me</span>
    </div>
  `,
});
Button.storyName = 'Tooltip on text';
