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

export const TabMedium = Template.bind({});
TabMedium.args = {
  label: 'Medium',
  size: 'md',
};

export const TabLarge = Template.bind({});
TabLarge.args = {
  label: 'Large',
  size: 'lg',
};

export const TabBottom = Template.bind({});
TabBottom.args = {
  label: 'Bottom',
  size: 'bottom',
};

export const TabTop = Template.bind({});
TabTop.args = {
  label: 'Top',
  size: 'top',
};

export const TabRight = Template.bind({});
TabRight.args = {
  label: 'Right',
  size: 'right',
};

export const TabLeft = Template.bind({});
TabLeft.args = {
  label: 'Left',
  size: 'left',
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
