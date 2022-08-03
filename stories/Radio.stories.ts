import { Story, Meta } from '@storybook/angular/types-6-0';
import { RadioComponent } from '../projects/ion/src/lib/radio/radio.component';

export default {
  title: 'Ion/Radio',
  component: RadioComponent,
} as Meta;

const Template: Story<RadioComponent> = (args: RadioComponent) => ({
  component: RadioComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: 'Custom label',
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
