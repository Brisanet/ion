import { Meta, Story } from '@storybook/angular/types-6-0';
import { SwitchComponent } from '../projects/ion/src/lib/switch/switch.component';

export default {
  title: 'Ion/Data Entry/Switch',
  component: SwitchComponent,
} as Meta;

const Template: Story<SwitchComponent> = (args: SwitchComponent) => ({
  component: SwitchComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  value: false,
};
