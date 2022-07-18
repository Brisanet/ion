import { Story, Meta } from '@storybook/angular/types-6-0';
import { ChipComponent } from '../projects/ion/src/lib/chip/chip.component';

export default {
  title: 'Ion/Chips',
  component: ChipComponent,
} as Meta;

const Template: Story<ChipComponent> = (args: ChipComponent) => ({
  component: ChipComponent,
  props: args,
});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Custom label',
};
