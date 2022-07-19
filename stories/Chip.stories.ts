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

export const Basic = Template.bind({});
Basic.args = {
  label: 'Custom label',
};

export const ChipSmall = Template.bind({});
ChipSmall.args = {
  label: 'Small',
  size: 'sm',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const Selected = Template.bind({});
Selected.args = {
  label: 'Selected',
  selected: true,
};
