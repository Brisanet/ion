import { Story, Meta } from '@storybook/angular/types-6-0';
import { TabComponent } from '../projects/ion/src/lib/tab/tab.component';

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
  tabSize: 'sm',
};

export const TabMedium = Template.bind({});
TabMedium.args = {
  label: 'Medium',
  tabSize: 'md',
};

export const TabLarge = Template.bind({});
TabLarge.args = {
  label: 'Large',
  tabSize: 'lg',
};

export const TabBottom = Template.bind({});
TabBottom.args = {
  label: 'Bottom',
  direction: 'bottom',
};

export const TabTop = Template.bind({});
TabTop.args = {
  label: 'Top',
  direction: 'top',
};

export const TabRight = Template.bind({});
TabRight.args = {
  label: 'Right',
  direction: 'right',
};

export const TabLeft = Template.bind({});
TabLeft.args = {
  label: 'Left',
  direction: 'left',
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
