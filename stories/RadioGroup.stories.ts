import { Story, Meta } from '@storybook/angular/types-6-0';
import { RadioGroupComponent } from '../projects/ion/src/lib/radio-group/radio-group.component';

export default {
  title: 'Ion/Data Entry/RadioGroup',
  component: RadioGroupComponent,
} as Meta;

const Template: Story<RadioGroupComponent> = (args: RadioGroupComponent) => ({
  component: RadioGroupComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const checked = Template.bind({});
checked.args = {
  label: 'Checked',
  checked: true,
};
