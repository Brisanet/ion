import { Story, Meta } from '@storybook/angular/types-6-0';
import { TabComponent } from 'projects/ion/src/lib/tab/tab.component';

export default {
  title: 'Ion/Tab',
  component: TabComponent,
} as Meta;

const Template: Story<TabComponent> = (args: TabComponent) => ({
  component: TabComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: 'Custom label',
};

export const TabSmall = Template.bind({});
TabSmall.args = {
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
